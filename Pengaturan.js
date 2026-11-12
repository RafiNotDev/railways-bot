import fs from 'node:fs';
import path from 'node:path';

const botId = process.env.BOT_ID || 'primary';
const dbPath = path.resolve('./Cache/Database/dashboard.json');
const defaults = {
  prefix: '.', namabot: 'Rafibot', namaowner: 'Owner', bot: '', owner: '', daerah: 'Jakarta',
  tampilan: '', sound: '', video: '', fotopp: '', idch: '', namach: '', linkch: '', linkgc: '',
  instagram: '', tiktok: '', website: ''
};

function readBotSettings() {
  try {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    return { ...defaults, ...(db.bots?.[botId]?.settings || {}) };
  } catch (error) {
    console.warn('[Rafibot] Pengaturan database belum tersedia, memakai nilai aman.', error.message);
    return { ...defaults };
  }
}

function applySettings(next) {
  const cfg = { ...defaults, ...next };
  global.setting = Object.assign(global.setting || {}, cfg);
  global.daerah = cfg.daerah || 'Jakarta';
  global.owner = cfg.owner ? [[String(cfg.owner).replace(/\D/g, ''), cfg.namaowner, true]] : [];
  global.wm = 'Nama Bot: ' + String(cfg.namabot);
  global.author = 'Developer Bot: ' + global.nodev;
  global.nodev = "6288279166081";
  global.stickpack = 'Nama Bot: ' + String(cfg.namabot);
  global.stickauth = 'Developer Bot: ' + global.nodev;
  // Motherboard reads this global on each message. Rebuild it when the dashboard changes prefix.
  if (cfg.prefix) {
    const escaped = String(cfg.prefix).replace(/[|\\{}()[\]^$+*?.\-]/g, '\\$&');
    global.prefix = new RegExp('^[' + escaped + ']');
  }
  console.log(`[Rafibot] Konfigurasi bot ${botId} dimuat/diperbarui.`);
}

applySettings(readBotSettings());
// Dashboard saves atomically via rename; polling also catches replacement of the JSON inode.
let lastSignature = '';
function reloadIfChanged() {
  try {
    const stat = fs.statSync(dbPath);
    const signature = `${stat.mtimeMs}:${stat.size}`;
    if (signature === lastSignature) return;
    lastSignature = signature;
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.bots?.[botId]?.settings) applySettings(db.bots[botId].settings);
  } catch (error) {
    if (error.code !== 'ENOENT') console.warn('[Rafibot] Gagal memuat ulang konfigurasi:', error.message);
  }
}
setInterval(reloadIfChanged, 1200).unref?.();
