import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import unzipper from 'unzipper';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.set('trust proxy', 1);
const startedAt = Date.now();
const PORT = Number(process.env.DASHBOARD_PORT || process.env.PORT || 3000);
const DB_DIR = path.join(__dirname, 'Cache', 'Database');
const DB_FILE = path.join(DB_DIR, 'dashboard.json');
const SESSION_DIR = path.join(__dirname, 'Cache', 'SesiBot');
const UPDATE_DIR = path.join(__dirname, 'Cache', 'Pembaruan');
const BACKUP_DIR = path.join(__dirname, 'Cache', 'Backups');
const PUBLIC_DIR = path.join(__dirname, 'public');
for (const dir of [DB_DIR, SESSION_DIR, UPDATE_DIR, BACKUP_DIR]) fs.mkdirSync(dir, { recursive: true });

const emptyDB = () => ({ users: {}, sessions: {}, bots: {}, notifications: [
  { id: crypto.randomUUID(), title: 'Selamat datang di Rafibot', message: 'Dashboard manajemen bot siap digunakan. Hubungkan bot WhatsApp pertamamu.', type: 'info', createdAt: new Date().toISOString() }
], updates: [] });
let db = emptyDB();
let lastBackupAt = null;
try { db = { ...emptyDB(), ...JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) }; } catch {}
let writeQueue = Promise.resolve();
let pgPool = null;
let databaseMode = 'json';
async function initDatabase() {
  if (!process.env.DATABASE_URL) return;
  try {
    const { Pool } = await import('pg');
    pgPool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false }, max: 5, idleTimeoutMillis: 30000, connectionTimeoutMillis: 10000 });
    await pgPool.query('CREATE TABLE IF NOT EXISTS rafibot_state (id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1), payload JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())');
    const result = await pgPool.query('SELECT payload FROM rafibot_state WHERE id = 1');
    if (result.rows[0]?.payload) db = { ...emptyDB(), ...result.rows[0].payload };
    else await pgPool.query('INSERT INTO rafibot_state (id,payload) VALUES (1,$1::jsonb) ON CONFLICT (id) DO NOTHING', [JSON.stringify(db)]);
    databaseMode = 'postgres';
    console.log('[DB] PostgreSQL aktif');
  } catch (error) {
    pgPool = null; databaseMode = 'json-fallback';
    console.error('[DB] PostgreSQL gagal, fallback ke JSON:', error.message);
  }
}
await initDatabase();
// Upgrade existing installations: retain the original first admin as the developer owner.
if (!Object.values(db.users).some(user => user.role === 'developer')) {
  const firstAdmin = Object.values(db.users).filter(user => user.role === 'admin').sort((a,b) => String(a.createdAt||'').localeCompare(String(b.createdAt||'')))[0];
  if (firstAdmin) firstAdmin.role = 'developer';
}

function saveDB() {
  writeQueue = writeQueue.then(async () => {
    const serialized = JSON.stringify(db);
    const tmp = DB_FILE + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(db, null, 2), { mode: 0o600 }); fs.renameSync(tmp, DB_FILE);
    if (pgPool) await pgPool.query('INSERT INTO rafibot_state (id,payload,updated_at) VALUES (1,$1::jsonb,NOW()) ON CONFLICT (id) DO UPDATE SET payload=EXCLUDED.payload, updated_at=NOW()', [serialized]);
  });
  return writeQueue;
}
// Keep the local snapshot in sync with PostgreSQL so live bot workers can poll config changes.\nawait saveDB();\n
const running = new Map();
const logs = new Map();
const frozen = new Set();
const desiredStarts = new Set();
const restartTimers = new Map();
const restartAttempts = new Map();
const MAX_AUTO_RESTARTS = Number(process.env.BOT_MAX_AUTO_RESTARTS || 8);
const defaults = { prefix: '.', namabot: 'Rafibot', namaowner: 'Owner', bot: '', owner: '', daerah: 'Jakarta', tampilan: '', sound: '', video: '', fotopp: '', idch: '', namach: '', linkch: '', linkgc: '', instagram: '', tiktok: '', website: '' };
const clean = (v, max=120) => String(v ?? '').trim().slice(0, max);
const hash = (v, salt) => crypto.scryptSync(v, salt, 64).toString('hex');
function safeEqual(a,b) { const aa=Buffer.from(String(a)); const bb=Buffer.from(String(b)); return aa.length===bb.length && crypto.timingSafeEqual(aa,bb); }
function cookieOpts() { return { httpOnly:true, sameSite:'strict', secure:process.env.NODE_ENV==='production', path:'/', maxAge:7*24*60*60*1000 }; }
function getUser(req) {
  const token = req.headers.cookie?.split(';').map(x=>x.trim()).find(x=>x.startsWith('rafibot_session='))?.split('=').slice(1).join('=');
  if (!token) return null;
  const key = crypto.createHash('sha256').update(decodeURIComponent(token)).digest('hex');
  const sess = db.sessions[key];
  if (!sess || sess.expiresAt < Date.now()) { delete db.sessions[key]; return null; }
  return db.users[sess.userId] || null;
}
function auth(req,res,next) { const user=getUser(req); if(!user) return res.status(401).json({error:'Silakan login kembali.'}); req.user=user; next(); }
function isAdmin(user) { return user?.role === 'admin' || user?.role === 'developer'; }
function admin(req,res,next) { if(!isAdmin(req.user)) return res.status(403).json({error:'Akses khusus admin.'}); next(); }
function developer(req,res,next) { if(req.user?.role !== 'developer') return res.status(403).json({error:'Fitur ini hanya tersedia untuk developer.'}); next(); }
function publicUser(u) { return {id:u.id,email:u.email,name:u.name,role:u.role==='developer'?'developer':u.role==='admin'?'admin':'user',avatar:u.avatar||''}; }
function ownedBot(req,res,next) { const bot=db.bots[req.params.id]; if(!bot || (bot.userId!==req.user.id && !isAdmin(req.user))) return res.status(404).json({error:'Bot tidak ditemukan.'}); req.bot=bot; next(); }
function addLog(id, line) { const arr=logs.get(id)||[]; arr.push({time:new Date().toISOString(),text:String(line).replace(/\u001b\[[0-9;]*m/g,'').slice(0,1200)}); if(arr.length>300) arr.shift(); logs.set(id,arr); }
function statusOf(id) { const p=running.get(id); return frozen.has(id)?'frozen':p?'running':'stopped'; }
function sessionPath(id) { return path.join(SESSION_DIR,id); }
function stopProcess(child) { if (!child) return; try { if (process.platform !== 'win32' && child.pid) process.kill(-child.pid, 'SIGTERM'); else child.kill('SIGTERM'); } catch { try { child.kill('SIGTERM'); } catch {} } }
function scheduleRestart(id, reason='process-exit') {
  if (!desiredStarts.has(id) || frozen.has(id) || restartTimers.has(id)) return;
  const attempt=(restartAttempts.get(id)||0)+1;
  if (attempt > MAX_AUTO_RESTARTS) { addLog(id,`AUTO-RESTART dihentikan setelah ${MAX_AUTO_RESTARTS} percobaan. Periksa log dan sesi WhatsApp.`); desiredStarts.delete(id); return; }
  restartAttempts.set(id,attempt);
  const delay=Math.min(60000,5000*Math.pow(2,attempt-1));
  addLog(id,`AUTO-RESTART dijadwalkan (${reason}) dalam ${Math.round(delay/1000)} detik, percobaan ${attempt}/${MAX_AUTO_RESTARTS}.`);
  const timer=setTimeout(()=>{restartTimers.delete(id);const bot=db.bots[id];if(bot&&desiredStarts.has(id)&&!running.has(id)) startBotProcess(bot);},delay);
  timer.unref?.(); restartTimers.set(id,timer);
}
function startBotProcess(bot) {
  const id=bot.id;
  if(running.has(id)) return running.get(id);
  frozen.delete(id); fs.mkdirSync(sessionPath(id),{recursive:true});
  const child=spawn(process.execPath,['./Perangkat_Keras/Power_suply.js','--pairing'],{cwd:__dirname,env:{...process.env,BOT_ID:id,BOT_HTTP_PORT:'0',MANAGEMENT_MODE:'1'},stdio:['ignore','pipe','pipe'],detached:process.platform!=='win32'});
  running.set(id,child); addLog(id,`Memulai ${bot.name}... PID ${child.pid}`);
  child.on('error',err=>{addLog(id,'ERROR: Gagal menjalankan proses: '+err.message);if(running.get(id)===child)running.delete(id);scheduleRestart(id,'spawn-error');});
  child.stdout.on('data',b=>String(b).split(/\r?\n/).filter(Boolean).forEach(x=>addLog(id,x)));
  child.stderr.on('data',b=>String(b).split(/\r?\n/).filter(Boolean).forEach(x=>addLog(id,'ERROR: '+x)));
  child.on('exit',(code,signal)=>{if(running.get(id)===child)running.delete(id);addLog(id,`Proses berhenti (code ${code}, signal ${signal||'-'}).`);if(desiredStarts.has(id))scheduleRestart(id,'process-exit');});
  return child;
}


app.use(express.json({limit:'3mb'}));
app.use(express.static(PUBLIC_DIR));
function systemSnapshot() {
  const mem = process.memoryUsage();
  const totalMem = requireTotalMemory();
  const cpu = process.cpuUsage();
  return {
    status: 'healthy', app: 'Rafibot Management', version: process.env.npm_package_version || '12.34.5',
    uptimeSeconds: Math.floor(process.uptime()), startedAt: new Date(startedAt).toISOString(),
    timestamp: new Date().toISOString(), platform: process.platform, node: process.version,
    memory: { rss: mem.rss, heapUsed: mem.heapUsed, heapTotal: mem.heapTotal, external: mem.external, systemTotal: totalMem, systemFree: os.freemem() },
    cpu: { userMicros: cpu.user, systemMicros: cpu.system, loadAverage: os.loadavg() },
    bots: { total: Object.keys(db.bots).length, running: [...running.keys()].length, frozen: frozen.size },
    database: db && typeof db === 'object' ? databaseMode : 'unavailable', backup: { enabled: true, lastRun: lastBackupAt, directory: 'Cache/Backups' }
  };
}
function requireTotalMemory(){ return os.totalmem(); }
function getRecommendations(snapshot) {
  const out = [];
  if (snapshot.memory.rss / snapshot.memory.systemTotal > .8) out.push({level:'warning',title:'Penggunaan RAM tinggi',detail:'RSS proses melebihi 80% RAM host. Kurangi jumlah instance atau tingkatkan memori Railway.'});
  if (snapshot.memory.heapUsed / snapshot.memory.heapTotal > .85) out.push({level:'warning',title:'Heap Node.js hampir penuh',detail:'Periksa listener, cache, dan proses yang terus bertambah. Pertimbangkan batas heap dan peningkatan RAM.'});
  if (snapshot.database !== 'postgres') out.push({level:process.env.DATABASE_URL?'warning':'info',title:process.env.DATABASE_URL?'PostgreSQL belum aktif':'Database masih menggunakan JSON',detail:process.env.DATABASE_URL?'Koneksi PostgreSQL belum terkonfirmasi. Periksa DATABASE_URL, kredensial, dan log startup; aplikasi sementara memakai fallback JSON.':'Tambahkan plugin PostgreSQL Railway dan hubungkan DATABASE_URL agar data akun, sesi dashboard, dan konfigurasi tersimpan di PostgreSQL.'});
  if (!process.env.RAILWAY_VOLUME_MOUNT_PATH) out.push({level:'warning',title:'Storage persisten belum terdeteksi',detail:'Pasang Railway Volume ke /app/Cache agar database dan sesi tidak hilang saat redeploy.'});
  if (snapshot.bots.running === 0) out.push({level:'info',title:'Belum ada bot aktif',detail:'Buat instance lalu jalankan bot. Pastikan kredensial WhatsApp dan konektivitas sudah siap.'});
  if (!out.length) out.push({level:'success',title:'Sistem dalam kondisi baik',detail:'Tidak ada rekomendasi kritis dari pemeriksaan dasar.'});
  return out;
}
app.get('/api/health',async(req,res)=> {
  let databaseOk = Boolean(db && typeof db === 'object');
  if (pgPool) { try { await pgPool.query('SELECT 1'); } catch { databaseOk = false; } }
  const healthy=databaseOk;
  res.status(healthy?200:503).json({ok:healthy,app:'Rafibot Management',status:healthy?'healthy':'degraded',database:databaseMode,databaseOk,uptimeSeconds:Math.floor(process.uptime()),timestamp:new Date().toISOString()});
});
app.get('/health',(req,res)=>res.redirect(307,'/api/health'));

app.get('/api/me',(req,res)=>{const u=getUser(req); res.json({user:u?publicUser(u):null,setup:!Object.keys(db.users).length});});
app.post('/api/register', async (req,res)=>{
  const name=clean(req.body.name,60), email=clean(req.body.email,120).toLowerCase(), password=String(req.body.password||'');
  if(name.length<2 || !/^\S+@\S+\.\S+$/.test(email) || password.length<10) return res.status(400).json({error:'Nama, email valid, dan password minimal 10 karakter wajib diisi.'});
  if(Object.values(db.users).some(u=>u.email===email)) return res.status(409).json({error:'Email sudah terdaftar.'});
  const id=crypto.randomUUID(), salt=crypto.randomBytes(16).toString('hex');
  // First account is the installation owner (developer); all later public signups are user-only.
  const role = Object.keys(db.users).length === 0 ? 'developer' : 'user';
  db.users[id]={id,name,email,salt,passwordHash:hash(password,salt),role,createdAt:new Date().toISOString()};
  await saveDB(); issueSession(id,res); res.json({user:publicUser(db.users[id])});
});
const passwordResetAttempts = new Map();
async function sendPasswordResetEmail(to, newPassword) {
  const host = process.env.SMTP_HOST, port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  if (!host || !user || !pass || !from) throw new Error('Layanan email belum dikonfigurasi. Atur SMTP_HOST, SMTP_USER, SMTP_PASS, dan SMTP_FROM.');
  const nodemailer = await import('nodemailer');
  const transporter = nodemailer.default?.createTransport
    ? nodemailer.default.createTransport({host,port,secure:process.env.SMTP_SECURE==='true',auth:{user,pass}})
    : nodemailer.createTransport({host,port,secure:process.env.SMTP_SECURE==='true',auth:{user,pass}});
  await transporter.sendMail({
    from, to, subject: 'Password baru Rafibot Management',
    text: `Password akun Rafibot Management kamu telah diatur ulang.\\n\\nPassword baru: ${newPassword}\\n\\nSegera login dan ganti password melalui menu Profil. Jika kamu tidak meminta pengaturan ulang ini, segera hubungi administrator.`,
    html: `<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px"><h2>Password baru Rafibot</h2><p>Password akun kamu telah diatur ulang.</p><p style="padding:16px;background:#f2f3f8;border-radius:8px;font-size:20px;font-weight:bold;letter-spacing:1px">${newPassword}</p><p>Segera login dan ganti password melalui menu Profil.</p><small>Jika kamu tidak meminta pengaturan ulang ini, hubungi administrator.</small></div>`
  });
}
app.post('/api/forgot-password', async (req,res)=>{
  const email=clean(req.body.email,120).toLowerCase();
  if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return res.status(400).json({error:'Masukkan alamat email yang valid.'});
  const ip=req.ip||req.socket.remoteAddress||'unknown';
  const now=Date.now(), key=ip+'|'+email, previous=passwordResetAttempts.get(key)||0;
  if(now-previous<60000) return res.status(429).json({error:'Tunggu 1 menit sebelum mencoba lagi.'});
  passwordResetAttempts.set(key,now);
  const user=Object.values(db.users).find(x=>x.email===email);
  // Do not reveal whether an email is registered.
  if(!user) return res.json({ok:true,message:'Jika email terdaftar, password baru akan dikirim.'});
  try {
    const newPassword=crypto.randomBytes(12).toString('base64url');
    await sendPasswordResetEmail(user.email,newPassword);
    const salt=crypto.randomBytes(16).toString('hex');
    user.salt=salt; user.passwordHash=hash(newPassword,salt);
    // Invalidate all existing sessions after a password reset.
    for(const [sessionKey,session] of Object.entries(db.sessions)) if(session.userId===user.id) delete db.sessions[sessionKey];
    await saveDB();
    return res.json({ok:true,message:'Jika email terdaftar, password baru akan dikirim.'});
  } catch(error) {
    console.error('[PASSWORD-RESET] Email gagal dikirim:',error.message);
    return res.status(503).json({error:'Email reset belum dapat dikirim. Periksa konfigurasi SMTP server.'});
  }
});
app.post('/api/login', async (req,res)=>{
  const email=clean(req.body.email,120).toLowerCase(), password=String(req.body.password||'');
  const u=Object.values(db.users).find(x=>x.email===email);
  if(!u || !safeEqual(hash(password,u.salt),u.passwordHash)) return res.status(401).json({error:'Email atau password salah.'});
  issueSession(u.id,res); await saveDB(); res.json({user:publicUser(u)});
});
app.put('/api/profile',auth,async(req,res)=>{
  const user=req.user;
  const name=clean(req.body.name,60);
  const email=clean(req.body.email,120).toLowerCase();
  const password=String(req.body.password||'');
  const avatar=typeof req.body.avatar==='string'?req.body.avatar:'';
  if(name.length<2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({error:'Nama minimal 2 karakter dan email harus valid.'});
  if(Object.values(db.users).some(u=>u.id!==user.id&&u.email===email)) return res.status(409).json({error:'Email sudah digunakan akun lain.'});
  if(password && password.length<10) return res.status(400).json({error:'Password baru minimal 10 karakter.'});
  if(avatar && (!/^data:image\/(png|jpeg|webp|gif);base64,/.test(avatar) || avatar.length>2_000_000)) return res.status(400).json({error:'Foto harus PNG, JPG, WEBP, atau GIF dan maksimal sekitar 1,5 MB.'});
  user.name=name; user.email=email;
  if(password){const salt=crypto.randomBytes(16).toString('hex');user.salt=salt;user.passwordHash=hash(password,salt);}
  if(avatar) user.avatar=avatar;
  if(req.body.removeAvatar===true) user.avatar='';
  await saveDB();
  res.json({user:publicUser(user)});
});
function issueSession(userId,res) { const token=crypto.randomBytes(32).toString('base64url'); const key=crypto.createHash('sha256').update(token).digest('hex'); db.sessions[key]={userId,expiresAt:Date.now()+7*86400000}; res.cookie('rafibot_session',token,cookieOpts()); }
app.post('/api/logout',auth,async(req,res)=>{ const token=req.headers.cookie?.split(';').map(x=>x.trim()).find(x=>x.startsWith('rafibot_session='))?.split('=').slice(1).join('='); if(token) delete db.sessions[crypto.createHash('sha256').update(decodeURIComponent(token)).digest('hex')]; res.clearCookie('rafibot_session',{path:'/'}); await saveDB(); res.json({ok:true}); });
async function createSessionBackup(reason='scheduled') {
  const stamp = new Date().toISOString().replace(/[:.]/g,'-');
  const target = path.join(BACKUP_DIR, `${stamp}-${reason}`);
  fs.mkdirSync(target, { recursive: true });
  let copied = 0;
  for (const entry of fs.readdirSync(SESSION_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const source = path.join(SESSION_DIR, entry.name);
    const destination = path.join(target, entry.name);
    try { fs.cpSync(source, destination, { recursive: true, errorOnExist: false }); copied++; }
    catch (error) { console.error('[BACKUP] Gagal menyalin sesi', entry.name, error.message); }
  }
  lastBackupAt = new Date().toISOString();
  const dirs = fs.readdirSync(BACKUP_DIR, { withFileTypes: true }).filter(x=>x.isDirectory()).map(x=>({name:x.name,time:fs.statSync(path.join(BACKUP_DIR,x.name)).mtimeMs})).sort((a,b)=>b.time-a.time);
  for (const old of dirs.slice(14)) fs.rmSync(path.join(BACKUP_DIR,old.name),{recursive:true,force:true});
  addLog('system', `Backup sesi ${reason}: ${copied} folder disalin.`);
  return { directory: path.relative(__dirname,target), sessions: copied, createdAt: lastBackupAt };
}
app.use('/api',auth);
app.get('/api/backups',developer,(req,res)=>{
  const items=fs.readdirSync(BACKUP_DIR,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>({name:x.name,createdAt:fs.statSync(path.join(BACKUP_DIR,x.name)).mtime.toISOString()})).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,30);
  res.json({backups:items,lastRun:lastBackupAt,retention:14});
});
app.post('/api/backups/run',developer,async(req,res)=>{try{res.json(await createSessionBackup('manual'));}catch(e){res.status(500).json({error:'Backup gagal: '+e.message});}});

app.get('/api/monitoring', (req,res) => {
  const snapshot=systemSnapshot();
  res.json({system:snapshot,recommendations:getRecommendations(snapshot),recentErrors:[...logs.entries()].flatMap(([botId,items])=>items.filter(x=>/error|fatal|exception/i.test(x.text)).slice(-5).map(x=>({botId,...x}))).slice(-20)});
});
app.get('/api/recommendations', (req,res) => res.json({recommendations:getRecommendations(systemSnapshot())}));
app.get('/api/dashboard',(req,res)=>{
  const bots=Object.values(db.bots).filter(b=>b.userId===req.user.id || isAdmin(req.user)).map(b=>({...b,ownerName:db.users[b.userId]?.name||'Akun dihapus',ownerEmail:db.users[b.userId]?.email||'',status:statusOf(b.id),sessionExists:fs.existsSync(sessionPath(b.id))}));
  res.json({bots,notifications:db.notifications.slice(0,30),updates:db.updates.slice(0,20),stats:{total:bots.length,running:bots.filter(b=>b.status==='running').length,users:Object.keys(db.users).length}});
});
app.post('/api/bots',async(req,res)=>{
  const name=clean(req.body.name,60)||'Bot Baru'; const id=crypto.randomUUID();
  db.bots[id]={id,userId:req.user.id,name,createdAt:new Date().toISOString(),settings:{...defaults,namabot:name,namaowner:req.user.name}};
  await saveDB(); res.json({bot:db.bots[id]});
});
app.get('/api/users',admin,(req,res)=>{
  const users=Object.values(db.users).map(u=>({id:u.id,name:u.name,email:u.email,role:u.role==='developer'?'developer':u.role==='admin'?'admin':'user',createdAt:u.createdAt,avatar:u.avatar||''}));
  res.json({users});
});
app.post('/api/users',admin,async(req,res)=>{
  const name=clean(req.body.name,60),email=clean(req.body.email,120).toLowerCase(),password=String(req.body.password||''),requestedRole=['user','admin','developer'].includes(req.body.role)?req.body.role:'user',role=requestedRole==='developer'&&req.user.role!=='developer'?'user':requestedRole;
  if(name.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||password.length<10)return res.status(400).json({error:'Nama, email valid, dan password minimal 10 karakter wajib diisi.'});
  if(Object.values(db.users).some(u=>u.email===email))return res.status(409).json({error:'Email sudah digunakan.'});
  const id=crypto.randomUUID(),salt=crypto.randomBytes(16).toString('hex');
  db.users[id]={id,name,email,salt,passwordHash:hash(password,salt),role,createdAt:new Date().toISOString(),createdBy:req.user.id};
  await saveDB();res.status(201).json({user:{id,name,email,role}});
});
app.delete('/api/users/:id',admin,async(req,res)=>{
  const target=db.users[req.params.id];if(!target)return res.status(404).json({error:'Akun tidak ditemukan.'});
  if(target.role==='developer'&&req.user.role!=='developer')return res.status(403).json({error:'Admin tidak dapat menghapus akun developer.'});
  if(target.id===req.user.id)return res.status(400).json({error:'Admin tidak dapat menghapus akunnya sendiri.'});
  if(isAdmin(target)&&Object.values(db.users).filter(isAdmin).length<=1)return res.status(400).json({error:'Minimal harus ada satu akun admin.'});
  for(const [key,sess] of Object.entries(db.sessions))if(sess.userId===target.id)delete db.sessions[key];
  for(const bot of Object.values(db.bots).filter(b=>b.userId===target.id)){
    desiredStarts.delete(bot.id);const timer=restartTimers.get(bot.id);if(timer)clearTimeout(timer);restartTimers.delete(bot.id);
    const child=running.get(bot.id);if(child)stopProcess(child);running.delete(bot.id);frozen.delete(bot.id);fs.rmSync(sessionPath(bot.id),{recursive:true,force:true});delete db.bots[bot.id];
  }
  delete db.users[target.id];await saveDB();res.json({ok:true});
});
app.delete('/api/bots/:id',admin,async(req,res)=>{
  const bot=db.bots[req.params.id];if(!bot)return res.status(404).json({error:'Bot tidak ditemukan.'});
  desiredStarts.delete(bot.id);const timer=restartTimers.get(bot.id);if(timer)clearTimeout(timer);restartTimers.delete(bot.id);
  const child=running.get(bot.id);if(child)stopProcess(child);running.delete(bot.id);frozen.delete(bot.id);restartAttempts.delete(bot.id);
  fs.rmSync(sessionPath(bot.id),{recursive:true,force:true});delete db.bots[bot.id];logs.delete(bot.id);await saveDB();res.json({ok:true});
});
app.get('/api/bots/:id',ownedBot,(req,res)=>res.json({...req.bot,status:statusOf(req.bot.id),logs:logs.get(req.bot.id)||[]}));
app.put('/api/bots/:id/settings',ownedBot,async(req,res)=>{
  const next={...defaults,...req.bot.settings};
  for(const k of Object.keys(defaults)) if(req.body[k]!==undefined) next[k]=clean(req.body[k],k==='tampilan'||k==='sound'||k==='video'||k==='fotopp'?500:120);
  if(!next.namabot || !next.namaowner) return res.status(400).json({error:'Nama bot dan nama owner wajib diisi.'});
  req.bot.name=next.namabot; req.bot.settings=next; await saveDB(); res.json({settings:next});
});
app.post('/api/bots/:id/start',ownedBot,async(req,res)=>{const id=req.bot.id;desiredStarts.add(id);restartAttempts.set(id,0);const timer=restartTimers.get(id);if(timer){clearTimeout(timer);restartTimers.delete(id);}const child=startBotProcess(req.bot);req.bot.autoStart=true;await saveDB();res.json({status:'running',pid:child.pid,autoRestart:true});});
app.post('/api/bots/:id/stop',ownedBot,(req,res)=>{const id=req.bot.id;desiredStarts.delete(id);const rt=restartTimers.get(id);if(rt){clearTimeout(rt);restartTimers.delete(id);}req.bot.autoStart=false;saveDB().catch(console.error); const child=running.get(id); if(child){stopProcess(child);running.delete(id);} frozen.delete(id); addLog(id,'Bot dihentikan. Sesi tetap disimpan.'); res.json({status:'stopped'});});
app.post('/api/bots/:id/freeze',ownedBot,(req,res)=>{const id=req.bot.id;desiredStarts.delete(id);const rt=restartTimers.get(id);if(rt){clearTimeout(rt);restartTimers.delete(id);}req.bot.autoStart=false;saveDB().catch(console.error); const child=running.get(id); if(child){stopProcess(child);running.delete(id);} frozen.add(id); addLog(id,'Bot dibekukan. Sesi tetap aman.'); res.json({status:'frozen'});});
app.delete('/api/bots/:id/session',ownedBot,(req,res)=>{const id=req.bot.id;desiredStarts.delete(id);req.bot.autoStart=false;const rt=restartTimers.get(id);if(rt){clearTimeout(rt);restartTimers.delete(id);}saveDB().catch(console.error); const child=running.get(id); if(child){stopProcess(child);running.delete(id);} frozen.delete(id); fs.rmSync(sessionPath(id),{recursive:true,force:true}); addLog(id,'Folder sesi WhatsApp dihapus.'); res.json({status:'session_deleted'});});
app.get('/api/bots/:id/logs',ownedBot,(req,res)=>res.json({status:statusOf(req.bot.id),logs:logs.get(req.bot.id)||[]}));
app.get('/api/notifications',(req,res)=>res.json({notifications:db.notifications}));
app.post('/api/notifications',developer,async(req,res)=>{const title=clean(req.body.title,100),message=clean(req.body.message,1000),type=['info','feature','removed','warning'].includes(req.body.type)?req.body.type:'info'; if(!title||!message)return res.status(400).json({error:'Judul dan pesan wajib diisi.'}); const item={id:crypto.randomUUID(),title,message,type,createdAt:new Date().toISOString(),by:req.user.name}; db.notifications.unshift(item); await saveDB(); res.json({notification:item});});
app.post('/api/developer/upload',developer,async(req,res)=>{
  if(!req.headers['content-type']?.includes('application/zip') && !req.headers['content-type']?.includes('application/octet-stream')) return res.status(415).json({error:'Upload harus berupa file ZIP.'});
  const chunks=[]; let size=0; for await(const chunk of req){size+=chunk.length;if(size>25*1024*1024)return res.status(413).json({error:'Maksimum ZIP 25 MB.'});chunks.push(chunk);} const buffer=Buffer.concat(chunks);
  const id=Date.now().toString(); const stage=path.join(UPDATE_DIR,id); fs.mkdirSync(stage,{recursive:true});
  try { const directory=await unzipper.Open.buffer(buffer); const files=[]; for(const entry of directory.files){if(entry.type==='Directory')continue; const rel=entry.path.replace(/\\/g,'/'); if(rel.startsWith('/')||rel.split('/').some(p=>p==='..')||rel.includes('\0')) throw new Error('Path file ZIP tidak aman.'); if(rel.startsWith('Cache/')||rel.startsWith('node_modules/')||rel==='.env'||rel==='dashboard-server.js') continue; const dest=path.join(stage,rel); fs.mkdirSync(path.dirname(dest),{recursive:true}); fs.writeFileSync(dest,await entry.buffer()); files.push(rel);} const update={id,title:clean(req.headers['x-update-title']||'Pembaruan pengembang',100),files,uploadedAt:new Date().toISOString(),status:'staged'}; db.updates.unshift(update); await saveDB(); res.json({update}); }
  catch(e){fs.rmSync(stage,{recursive:true,force:true});res.status(400).json({error:'ZIP gagal diproses: '+e.message});}
});
app.post('/api/developer/apply/:id',developer,async(req,res)=>{
  const update=db.updates.find(x=>x.id===req.params.id); if(!update)return res.status(404).json({error:'Pembaruan tidak ditemukan.'});
  const stage=path.join(UPDATE_DIR,update.id), backup=path.join(UPDATE_DIR,update.id+'-backup'); fs.mkdirSync(backup,{recursive:true}); const applied=[];
  try { for(const rel of update.files){const src=path.join(stage,rel),dest=path.resolve(__dirname,rel); if(!dest.startsWith(__dirname+path.sep))throw new Error('Path tidak aman.'); fs.mkdirSync(path.dirname(dest),{recursive:true}); if(fs.existsSync(dest)){const b=path.join(backup,rel);fs.mkdirSync(path.dirname(b),{recursive:true});fs.copyFileSync(dest,b);} fs.copyFileSync(src,dest);applied.push(rel);} update.status='applied';update.appliedAt=new Date().toISOString();await saveDB(); res.json({ok:true,applied,backup:`Cache/Pembaruan/${update.id}-backup`}); }
  catch(e){res.status(500).json({error:'Penerapan parsial: '+e.message,applied});}
});
app.get('*',(req,res)=>res.sendFile(path.join(PUBLIC_DIR,'index.html')));
const server=app.listen(PORT,'0.0.0.0',()=>{
  console.log(`Rafibot Management berjalan di http://localhost:${PORT}`);
  for (const bot of Object.values(db.bots)) if (bot.autoStart) { desiredStarts.add(bot.id); setTimeout(()=>{if(desiredStarts.has(bot.id))startBotProcess(bot);},3000).unref?.(); }
  setTimeout(()=>createSessionBackup('startup').catch(e=>console.error('[BACKUP]',e.message)),15000).unref?.();
});
const backupTimer=setInterval(()=>createSessionBackup('scheduled').catch(e=>console.error('[BACKUP]',e.message)),Number(process.env.SESSION_BACKUP_INTERVAL_MS||21600000));
backupTimer.unref?.();

async function shutdown(signal) {
  console.log(`${signal}: menghentikan Rafibot Management...`);
  clearInterval(backupTimer); for (const timer of restartTimers.values()) clearTimeout(timer); for (const child of running.values()) stopProcess(child);
  running.clear();
  try { await createSessionBackup('shutdown').catch(()=>{}); await saveDB(); if(pgPool) await pgPool.end(); } finally { server.close(()=>process.exit(0)); setTimeout(()=>process.exit(1),10000).unref(); }
}
process.on('SIGTERM',()=>shutdown('SIGTERM'));
process.on('SIGINT',()=>shutdown('SIGINT'));
