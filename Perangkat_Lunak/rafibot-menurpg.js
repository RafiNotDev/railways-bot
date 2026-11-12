import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../Perangkat_Keras/Komponen/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import fetch from 'node-fetch'
const { generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default

const time = moment().tz('Asia/Jakarta');
const tanggalLebaran = moment("2026-03-20");
  const tanggalPuasa = moment("2027-02-7");
  const tanggalIdulAdha = moment("2026-05-28"); 
  const tanggalNatal = moment("2026-12-25");
  
  // Countdown to events
  const mundurLebaran = tanggalLebaran.diff(time, 'days');
  const mundurPuasa = tanggalPuasa.diff(time, 'days');
  const mundurIdulAdha = tanggalIdulAdha.diff(time, 'days');
  const mundurNatal = tanggalNatal.diff(time, 'days');
  let fitur = Object.values(Tools).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
let totalf = Object.values(global.Tools).filter(
    (v) => v.help && v.tags
  ).length;
let owner1 = `${setting.owner}@s.whatsapp.net`
let owner2 = `${owner1.split('@')[0]}`
let pilihan = {
bot: setting.bot + "@s.whatsapp.net",
owner: setting.owner + "@s.whatsapp.net",
dev: global.nodev + "@s.whatsapp.net"
}
let nobot = conn.user.jid
let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command}) => {
let status = `${m.sender === pilihan.dev ? 'Developer Bot' : m.sender === pilihan.owner ? 'Owner Bot' : m.sender === pilihan.bot ? 'Bot Whatsapp' : 'User Gratisan'}`
let money = db.data.users[m.sender].money
const defaultMenu = {
  before: `╭─[ 🤖 Info Bot ]─╮  
│ 🏷️ Nama: ${setting.namabot}
│ 📞 Nomor: @${nobot.split('@')[0]}
│ 🥶 Mode: %mode
│ 🎰 Total fitur: ${fitur.length}
│ 🙋 Total user: %totalreg
│ 🫂 Total register: %rtotalreg
│ 🧑‍⚖️ Owner: @${owner2}
╰─────────────────╯

╭─[ ⏳ Waktu ]─╮  
│ 🕥 Waktu: %wib WIB
│ 🗓️ Tanggal: %date
│ 🌍 Weton: %weton
│ 🕌 Lebaran: ${mundurLebaran} hari lagi
│ 🕌 Puasa: ${mundurPuasa} hari lagi
│ 🕌 Idul Adha: ${mundurIdulAdha} hari lagi
│ ⛪ Natal: ${mundurNatal} hari lagi
╰────────────────╯

╭─[ 👤 Info Pengguna ]─╮  
│ 🏷️ Nama: %name
│ 📞 Nomor: %tag
│ 💵 Uang: ${money}
│ 🎚️ Limit: %limit
│ 🏅 Status: ${status}
│ 💏 Pasangan: %jodoh
│ 🔢Exp : %exp
│ 🤝 Level: %level
│ 🥉 Kelas: %role
╰──────────────────╯

Terima Kasih Semua, Salam Dari ${setting.namabot}!


\n`,
  header: `╭┈┈⬡「 %category  」`,
  body: `┃ ◦ %cmd\n`,
  footer: '╰┈┈┈┈┈┈┈┈⬡\n\n',
  after: `*Developer:* @${global.nodev}`,
}
let tags = {
'rpg': 'Menu Rpg',
}
 
  try {
  	// DEFAULT MENU
      let dash = global.dashmenu
  	let m1 = global.dmenut
      let m2 = global.dmenub
      let m3 = global.dmenuf
      let m4 = global.dmenub2
      
      // COMMAND MENU
      let cc = global.cmenut
      let c1 = global.cmenuh
      let c2 = global.cmenub
      let c3 = global.cmenuf
      let c4 = global.cmenua
      
      // LOGO L P
      let lprem = global.lopr
      let llim = global.lolm
      let tag = `@${m.sender.split('@')[0]}`
    
    //-----------TIME---------
    let ucpn = `${ucapan()}`
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let _mpt
    if (process.send) {
      process.send('uptime')
      _mpt = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let mpt = clockString(_mpt)
    let usrs = db.data.users[m.sender]
      
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
    let wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
 
    let mode = global.opts['self'] ? 'Private' : 'Publik'
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { age, exp, limit, pasangan, level, role, registered, eris} = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'Yes': 'No'}`
    let platform = os.platform()
    let jodoh = pasangan ? `Berpacaran @${pasangan.split`@`[0]}` : 'Jomblo'
    
    //---------------------
    
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.Tools).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
          }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%_p' + help)
                .replace(/%islimit/g, menu.limit ? llim : '')
                .replace(/%isPremium/g, menu.premium ? lprem : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      tag, dash,m1,m2,m3,m4,cc, c1, c2, c3, c4,lprem,llim,
      ucpn,platform, wib, mode, _p, eris, age, tag, name, prems, level, jodoh, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
 let fkon = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
try {
await conn.sendPresenceUpdate('composing', m.chat)
await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key }})
} finally {
  rafimenu(m.chat, text)
}
await sleep(3000)
try {
await conn.sendPresenceUpdate('recording', m.chat)
} finally {
global.musik(m.chat, setting.sound)
}
} catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    conn.sendMessage(m.chat, { react: { text: '❌', key: m.key }})
    throw e
  } finally {
   conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}
handler.help = ['menurpg']
handler.tags = ['rafi']
handler.command = /^(menurpg|rpgmenu)$/i
export default handler

//----------- FUNCTION -------

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('')
}
function clockStringP(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [ye, ' *Years 🗓️*\n',  mo, ' *Month 🌙*\n', d, ' *Days ☀️*\n', h, ' *Hours 🕐*\n', m, ' *Minute ⏰*\n', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Kok Belum Tidur Kak? 🥱"
  if (time >= 4) {
    res = "SELAMAT PAGI 🌄"
  }
  if (time >= 10) {
    res = "SELAMAT SIANG ☀️"
  }
  if (time >= 15) {
    res = "SELAMAT SORE 🌇"
  }
  if (time >= 18) {
    res = "SELAMAT MALAM 🌙"
  }
  return res
}