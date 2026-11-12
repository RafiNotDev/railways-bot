process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
import "../Pengaturan.js";
import path, { join } from 'path'
import { platform } from 'process'
import { fileURLToPath, pathToFileURL } from 'url'
import { createRequire } from 'module'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'
import fs from 'fs'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).argv

import { spawn } from 'child_process'
import lodash from 'lodash'
import syntaxerror from 'syntax-error'
import chalk from 'chalk'
import cfonts from "cfonts";
import { tmpdir } from 'os'
import readline from 'readline'
import { format } from 'util'
import pino from 'pino'
import ws from 'ws'

const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  PHONENUMBER_MCC: MCC_BAILEYS
} = await import('@adiwajshing/baileys')

const PHONENUMBER_MCC = MCC_BAILEYS || {
  '62': 'ID', // Indonesia
  '1': 'US',  // USA
  '91': 'IN', // India
  // tambah kode negara lain sesuai kebutuhan
}
import { Low, JSONFile } from 'lowdb'
import { makeWASocket, protoType, serialize } from '../Perangkat_Keras/Komponen//simple.js'
import cloudDBAdapter from '../Perangkat_Keras/Komponen//cloudDBAdapter.js'
import {
  mongoDB,
  mongoDBV2
} from '../Perangkat_Keras/Komponen//mongoDB.js'

import {
    startSubBot, stopSubBot, restoreSubBots, getSubBot,
    hasSubBot, getSubBots, getSubBotCount
} from './Komponen/jadibot.js';

const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
  start: new Date
}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || setting.prefix).replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb(\+srv)?:\/\//i.test(opts['db']) ?
      (opts['mongodbv2'] ? new mongoDBV2(opts['db']) : new mongoDB(opts['db'])) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}./Cache/Database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (db.READ) return new Promise((resolve) => setInterval(async function () {
    if (!db.READ) {
      clearInterval(this)
      resolve(db.data == null ? global.loadDatabase() : db.data)
    }
  }, 1 * 1000))
  if (db.data !== null) return
  db.READ = true
  await db.read().catch(console.error)
  db.READ = null
  db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(db.data || {})
  }
  global.db.chain = chain(db.data)
}
loadDatabase()
const usePairingCode = !process.argv.includes('--use-pairing-code')
const useMobile = process.argv.includes('--mobile')

var question = function (text) {
  return new Promise(function (resolve) {
    rl.question(text, resolve);
  });
};
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
await sleep(1000)
console.clear()
if (fs.existsSync("./Cache/Sampah")) {
    console.log('Folder Sampah Ditemukan!');
  } else {
    await fs.mkdirSync("./Cache/Sampah");
    console.log('Berhasil Membuat Folder Sampah');
  }
await sleep(2000)
console.clear()
const datadeveloper = await fetch('https://raw.githubusercontent.com/RafiNotDev/DatabaseBot/refs/heads/main/Database.json');
const dev = await datadeveloper.json();
let text = chalk.bold.white(`╔━──⪼ ${chalk.bold.blue('I N F O  D E V E L O P E R')}\n`)
            text += chalk.bold.white(`╠⪼ NAMA: ${chalk.bold.red(dev.nama)}\n`)
            text += chalk.bold.white(`╠⪼ WHATSAPP: ${chalk.bold.green(`https://wa.me/${dev.nomor}`)}\n`)
            text += chalk.bold.white(`╠⪼ CHANNEL WA: ${chalk.bold.green(dev.channel)}\n`)
            text += chalk.bold.white(`╠⪼ INSTAGRAM: ${chalk.bold.green(dev.instagram)}\n`)
            text += chalk.bold.white(`╠⪼ TIKTOK: ${chalk.bold.green(dev.tiktok)}\n`)
            text += chalk.bold.white(`╠⪼ TELEGRAM: ${chalk.bold.green(dev.telegram)}\n`)
            text += chalk.bold.white(`╚═══════════━──⪼`)
console.log(text)

const { version, isLatest } = await fetchLatestBaileysVersion()
const { state, saveCreds } = await useMultiFileAuthState(`./Cache/SesiBot/${process.env.BOT_ID || 'primary'}`)
const connectionOptions = {
  version,
  logger: pino({ level: 'silent' }),
  printQRInTerminal: !usePairingCode,
  // Optional If Linked Device Could'nt Connected
  // browser: ['Mac OS', 'chrome', '125.0.6422.53']
  browser: ['Mac OS', 'safari', '5.1.10'],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, pino().child({
      level: 'silent',
      stream: 'store'
    })),
  },
  getMessage: async key => {
    const messageData = await store.loadMessage(key.remoteJid, key.id);
    return messageData?.message || undefined;
  },
  generateHighQualityLinkPreview: true,
  patchMessageBeforeSending: (message) => {
    const requiresPatch = !!(
      message.buttonsMessage
      || message.templateMessage
      || message.listMessage
    );
    if (requiresPatch) {
      message = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadataVersion: 2,
              deviceListMetadata: {},
            },
            ...message,
          },
        },
      };
    }

    return message;
  },
  connectTimeoutMs: 60000, defaultQueryTimeoutMs: 0, generateHighQualityLinkPreview: true, syncFullHistory: true, markOnlineOnConnect: true
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false

if (usePairingCode && !conn.authState.creds.registered) {
  if (useMobile) throw new Error('Cannot use pairing code with mobile api')
  await sleep(3000);
  console.clear();
  console.log(text)
  console.log(' ')
  cfonts.say(`${setting.namabot}`, {
    font: "tiny",
    align: "left",
    colors: ["blue"]
  });
  console.log(' ')
  cfonts.say("Pairing", {
    font: "tiny",
    align: "left",
    colors: ["blue"]
  });
  console.log(' ')
  console.log(chalk.bold.green(`Nama Bot: ${setting.namabot}\nNomor Bot: ${setting.bot}\nNama Owner: ${setting.namaowner}\nNomor Owner: ${setting.owner}`));
  console.log(' ')
  console.log(chalk.bold.green(`Kode Pairing Otomatis Di Dapatkan Dari Nomor Bot`))
  console.log(' ')
  await sleep(2000)
  console.log(chalk.bold.green(`Mendapatkan Code Pairing...`))
  await sleep(2000)
  console.log(' ')
  let phoneNumber = global.setting.bot;
  phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
  setTimeout(async () => {
    try {
      let code = await conn.requestPairingCode(phoneNumber, 'RAFIBAIL')
      code = code?.match(/.{1,4}/g)?.join('-') || code
      console.log(chalk.bold.blue("Kode Anda Adalah : "), chalk.bold.white(code));
  rl.close();
    } catch (e) {
      console.error(chalk.red('❌ Gagal generate pairing code:'), e)
      await HapusSesi()
      process.exit(1)
    }
  }, 3000)
} 
async function resetLimit() {
  try {
    let list = Object.entries(global.db.data.users);
    let lim = 5; // Nilai limit default yang ingin di-reset

    list.map(([user, data], i) => {
      // Hanya reset limit jika limit saat ini <= 25
      if (data.limit <= lim) {
        data.limit = lim;
      }
    });

    // logs bahwa reset limit telah sukses
    console.log(`Success Auto Reset Limit`)
  } finally {
    // Setel ulang fungsi reset setiap 24 jam (1 hari)
    setInterval(() => resetLimit(), 1 * 86400000);
  }
}

if (!opts['test']) {
  (await import('../server.js')).default(PORT)
  setInterval(async () => {
    if (global.db.data) await global.db.write().catch(console.error)
    // if (opts['autocleartmp']) try {
    clearTmp()
    //  } catch (e) { console.error(e) }
  }, 60 * 1000)
}

function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, `../Cache/Sampah`)]
  const filename = []
  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
  return filename.map(file => {
    const stats = statSync(file)
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file) // 3 minutes
    return false
  })
}

async function HapusSesi() {
  try {
    await fs.unlink(`./Cache/SesiBot/${process.env.BOT_ID || 'primary'}/creds.json`);
    console.log('File Sesi Creds.json Berhasil Di Hapus');
  } catch (err) {
    console.error('Gagal menghapus file:', err);
  }
}

async function clearSessions(folder = `./Cache/SesiBot/${process.env.BOT_ID || 'primary'}`) {
  try {
    const filenames = await readdirSync(folder);
    const deletedFiles = await Promise.all(filenames.map(async (file) => {
      try {
        const filePath = path.join(folder, file);
        const stats = await statSync(filePath);
        if (stats.isFile() && file !== 'creds.json') {
          await unlinkSync(filePath);
          console.log('Deleted session:'.main, filePath.info);
          return filePath;
        }
      } catch (err) {
        console.error(`Gagal Memproses Sesi ${file}: ${err.message}`);
      }
    }));
    return deletedFiles.filter((file) => file !== null);
  } catch (err) {
    console.error(`Gagal Menghapus Sesi: ${err.message}`);
    return [];
  } finally {
    setTimeout(() => clearSessions(folder), 1 * 3600000); // 1 Hours
  }
}

let jadibotRestored = false;

async function connectionUpdate(update) {
  const { receivedPendingNotifications, connection, lastDisconnect, isOnline, isNewLogin } = update;

  if (isNewLogin) {
    conn.isInit = true;
  }
if (connection == "connecting") {
  console.log(chalk.redBright("Menyambungkan Ke Server Website"));
} else {
  if (connection == "open") {
    console.log(chalk.green("Bot Tersambung Kek Dalam Server Website"));
    if (!jadibotRestored) {
            jadibotRestored = true;
            try {
                await restoreSubBots(global.conn);
            } catch (e) {
                console.error(chalk.red('[JADIBOT] Gagal restore:'), e);
            }
        }
  }
}
if (isOnline == true) {
  console.log(chalk.green("Server Website Terbuka"));
} else if (isOnline == false) {
  console.log(chalk.red("Server Website Tertutup"));
}
if (receivedPendingNotifications) {
  console.log(chalk.yellow("Menunggu Respon Dari Website"));
}
if (connection == "close") {
  console.log(chalk.red("Server Website Tidak Menanggapi, Dan Bot Keluar Dari Server"));
}
  global.timestamp.connect = new Date;

  if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== CONNECTING) {
    console.log(await global.reloadHandler(true));
  }
  if (global.db.data == null) {
    await global.loadDatabase();
  }
}
process.on('uncaughtException', console.error)
let isInit = true
let handler = await import('./Chipset.js')
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./Chipset.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) {
    console.error(e)
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try { global.conn.ws.close() } catch { }
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    isInit = true
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('groups.update', conn.groupsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

  conn.welcome = "_*Selamat Datang @user Di GROUP @subject*_\n*SEBELUM MEMULAI OBROLAN SILAHKAN INTRO DULU DI BAWAH*\n\nƙαɾƚυ іᥒ𝗍r᥆\n 𝐰𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨\n\nଓ 𝐧𝐚𝐦𝐚:\nଓ 𝐚𝐬𝐤𝐨𝐭:\nଓ 𝐠𝐞𝐧𝐝𝐞𝐫:\nଓ 𝐤𝐞𝐥𝐚𝐬:\nଓ 𝐮𝐦𝐮𝐫:\n\n\nѕємσgα вєтαн' уαଓ\n\n> Semoga Betah"
  conn.bye = "*😢 Selamat Tinggal, Kak @user 👋*\n\n_Terima kasih sudah menjadi bagian dari grup ini. Semoga kita bisa bertemu lagi di lain kesempatan. Hati-hati di perjalanan ya~ 💐_";
  conn.spromote = '@user Sekarang jadi admin!'
  conn.sdemote = '@user Sekarang bukan lagi admin!'
  conn.sDesc = 'Deskripsi telah diubah menjadi \n@desc'
  conn.sSubject = 'Judul grup telah diubah menjadi \n@subject'
  conn.sIcon = 'Icon grup telah diubah!'
  conn.sRevoke = 'Link group telah diubah ke \n@revoke'
  conn.sAnnounceOn = 'Group telah di tutup!\nsekarang hanya admin yang dapat mengirim pesan.'
  conn.sAnnounceOff = 'Group telah di buka!\nsekarang semua peserta dapat mengirim pesan.'
  conn.sRestrictOn = 'Edit Info Grup di ubah ke hanya admin!'
  conn.sRestrictOff = 'Edit Info Grup di ubah ke semua peserta!'

  conn.handler = handler.handler.bind(global.conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
  conn.onDelete = handler.deleteUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn)

  conn.ev.on('call', async (call) => {
    console.log('Panggilan diterima:', call);
    if (call.status === 'ringing') {
      await conn.rejectCall(call.id);
      console.log('Panggilan ditolak');
    }
  })
  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('groups.update', conn.groupsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true

}

const ToolFolder = global.__dirname(join(__dirname, '../Perangkat_Lunak/index'))
const ToolFilter = filename => /\.js$/.test(filename)
global.Tools = {}
async function filesInit() {
  for (let filename of readdirSync(ToolFolder).filter(ToolFilter)) {
    try {
      let file = global.__filename(join(ToolFolder, filename))
      const module = await import(file)
      global.Tools[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.Tools[filename]
    }
  }
}
filesInit().then(_ => console.log(Object.keys(global.Tools))).catch(console.error)

global.reload = async (_ev, filename) => {
  if (ToolFilter(filename)) {
    let dir = global.__filename(join(ToolFolder, filename), true)
    if (filename in global.Tools) {
      if (existsSync(dir)) conn.logger.info(`Memuat Ulang Package '${filename}'`)
      else {
        conn.logger.warn(`Menghapus Package '${filename}'`)
        return delete global.Tools[filename]
      }
    } else conn.logger.info(`Memuat Packge Baru '${filename}'`)
    let err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true
    })
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
    else try {
      const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
      global.Tools[filename] = module.default || module
    } catch (e) {
      conn.logger.error(`Gagal Memuat Peckage '${filename}\n${format(e)}'`)
    } finally {
      global.Tools = Object.fromEntries(Object.entries(global.Tools).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
watch(ToolFolder, global.reload)
await global.reloadHandler()

// Quick Test

async function _quickTest() {
  let test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127);
        });
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false));
      })
    ]);
  }));

  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  console.log(test);

  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  };

  Object.freeze(global.support);

  if (!s.ffmpeg) {
    conn.logger.warn(`Silahkan install ffmpeg terlebih dahulu agar bisa mengirim video`);
  }

  if (s.ffmpeg && !s.ffmpegWebp) {
    conn.logger.warn('Sticker Mungkin Tidak Beranimasi tanpa libwebp di ffmpeg (--enable-libwebp while compiling ffmpeg)');
  }

  if (!s.convert && !s.magick && !s.gm) {
    conn.logger.warn('Fitur Stiker Mungkin Tidak Bekerja Tanpa imagemagick dan libwebp di ffmpeg belum terinstall (pkg install imagemagick)');
  }
}

_quickTest()
  .then(() => conn.logger.info(`${!conn.authState.creds.registered ? "Membuat" : "Memuat"} Sesi Server Website, Format: ~> creds.json`))
  .catch(console.error);
