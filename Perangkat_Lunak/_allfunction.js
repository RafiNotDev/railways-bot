import axios from "axios"
import moment from "moment-timezone";
import { generateWAMessageContent, generateWAMessageFromContent } from "@adiwajshing/baileys";
import crypto from "crypto";
import { sticker } from "../Perangkat_Keras/Komponen/sticker.js"
const { proto } = (await import('@adiwajshing/baileys')).default

let handler = (m) => m;
handler.before = async (m, { conn, text, args }) => {

let imagepp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => setting.tampilan)   
let anu = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': conn.getName(m.sender), 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${conn.getName(m.sender)},;;;\nFN:${conn.getName(m.sender)}\nitem1.TEL;waid=${m.sender}:${m.sender}\nitem1.X-ABLabel:Mobile\nEND:VCARD`, 'jpegThumbnail': imagepp, thumbnail: imagepp,sendEphemeral: true}}}
           // Bagian Function Bot //
        
    function RafiTampilan(jid = `${global.groub}`, teks, quotedd = anu, thumb = imagepp, render = 'true') {
    const userTampilan = global.db.data.settings[conn.user.jid].tampilan
   
  if (userTampilan === "button") {
    return conn.sendMessage(jid, {
  text: teks,
  footer: setting.namabot,
  interactiveButtons: [
  { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: `SEMUA FITUR BOT`, id: `.allmenu` }) },
    { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'CHAT OWNER', url: `https://wa.me/${setting.owner}` }) },
    { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'CHAT DEVELOPER', url: `https://wa.me/${global.nodev}` }) }
  ], contextInfo: {
                mentionedJid: conn.parseMention(teks),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                },
               }, { quoted: quotedd })
}

if (userTampilan === "teks") {
return conn.sendMessage(jid, {
       text: teks,
       contextInfo: {
                mentionedJid: conn.parseMention(teks),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                },
       }, { quoted: quotedd })
}
if (userTampilan === "gambar") {
return conn.sendMessage(jid, {
            image: { url: thumb },
            caption: teks,
            contextInfo: {
                mentionedJid: conn.parseMention(teks),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                },
            }, { quoted: quotedd })
}
return conn.sendMessage(jid, {
            text: teks,
            contextInfo: {
                mentionedJid: conn.parseMention(teks),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                   externalAdReply: {
                   title: `${ucapan()} Kak ${conn.getName(m.sender)}`,
                   body: setting.namabot,
                   thumbnailUrl: thumb,
                   sourceUrl: setting.website,
                   mediaType: 1,
                   renderLargerThumbnail: render
                   },
                },
            }, { quoted: quotedd })
}

    function RafiMenu(jid = `${global.groub}`, teks, quotedd = anu, thumb = imagepp, render = 'true') {
const userMenu = global.db.data.settings[conn.user.jid].menu
  
  if (userMenu === "button") {
    return conn.sendMessage(jid, {
  text: teks,
  footer: setting.namabot,
  contextInfo: {
                mentionedJid: conn.parseMention(teks),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                },
  interactiveButtons: [
    { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'CHAT OWNER', url: `https://wa.me/${setting.owner}` }) },
    { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'CHAT DEVELOPER', url: `https://wa.me/${global.nodev}` }) }
  ],
}, { quoted: quotedd })
}
if (userMenu === "teks") {
return conn.sendMessage(m.chat, {
    productMessage: {
        title: `${ucapan()} Kak ${conn.getName(m.sender)}`,
        description: "Ini adalah deskripsi produk",
        thumbnail: { url: imagepp },
        productId: "PROD001",
        retailerId: "RETAIL001",
        url: setting.website,
        body: teks,
        footer: setting.namabot,
        priceAmount1000: 500000,
        currencyCode: "IDR",
        contextInfo: {
                mentionedJid: conn.parseMention(teks),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
              },
        
    }
}, { quoted: quotedd });
}
if (userMenu === "gambar") {
return conn.sendMessage(jid, {
            image: { url: thumb },
            caption: teks,
            contextInfo: {
                mentionedJid: conn.parseMention(teks),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
              },
            }, { quoted: quotedd })
}
if (userMenu === "animasi") {
return conn.sendMessage(jid, {
            video: { url: setting.video },
            caption: teks,
            gifPlayback: true,
            contextInfo: {
                mentionedJid: conn.parseMention(teks),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                },
            }, { quoted: quotedd })
}
return conn.sendMessage(jid, {
            text: teks,
            contextInfo: {
                mentionedJid: conn.parseMention(teks),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                   externalAdReply: {
                   title: `${ucapan()} Kak ${conn.getName(m.sender)}`,
                   body: setting.namabot,
                   thumbnailUrl: thumb,
                   sourceUrl: setting.website,
                   mediaType: 1,
                   renderLargerThumbnail: render
                   },
                },
            }, { quoted: quotedd })
}
    function RafiMusik(jid = `${global.groub}`, link, quotedd = anu) {
    let userMusik = global.db.data.settings[conn.user.jid].musik
    if ( userMusik === "pesan suara" ) {
return conn.sendMessage(jid, { 
                audio: {url: link}, 
                mimetype: "audio/mpeg",
                ptt: true,
               }, { quoted: quotedd })
}
    if ( userMusik === "fake saluran") {
return conn.sendMessage(jid, { 
                audio: {url: link}, 
                mimetype: "audio/mpeg",
                ptt: true,
                contextInfo: {
mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: global.setting.idch,
      serverMessageId: 103,
      newsletterName: global.setting.namach
    },
    }}, { quoted: quotedd })
}
return conn.sendMessage(jid, { 
                audio: {url: link}, 
                mimetype: "audio/mpeg",
                ptt: false,
               }, { quoted: quotedd })
}
function RafiCostum(jid = `${global.groub}`, teks, title = `${ucapan()} Kak ${conn.getName(m.sender)}`, body = setting.namabot, thumb = imagepp, render = true, quotedd = m ) {
conn.sendMessage(jid, {
            text: teks,
            contextInfo: {
                mentionedJid: conn.parseMention(teks),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: setting.idch,
                   serverMessageId: null,
                   newsletterName: setting.namach,
                   },
                   externalAdReply: {
                   title: title,
                   body: body,
                   thumbnailUrl: thumb,
                   sourceUrl: setting.website,
                   mediaType: 1,
                   renderLargerThumbnail: render
                   },
                },
            }, { quoted: quotedd })
}

async function Jadisticker(url) {
let response = await axios.get(url, { responseType: 'arraybuffer' })
      let Stiker = await sticker(response.data, false, stickpack, stickauth)
      conn.sendFile(m.chat, Stiker, 'hasil.webp', { asSticker: true }, m)
}
function Potopp(jid) {
conn.profilePictureUrl(jid, 'image').catch(_ => "https://files.catbox.moe/itl427.jpg")
}

async function Mentions(text) {
const participantss = (await conn.groupMetadata(m.chat)).participants
    let orang = null;
    if (m.quoted) return orang = m.quoted.sender
    if (!text) {
    orang = m.sender
    } else {
    const mentionedUser = text.match(/@([0-9]{7,16})/);  // Regex untuk menangkap mention ID
      const mentionedUserId = mentionedUser[1]
      orang = participantss.find(user => user.id.includes(mentionedUserId))?.jid
}
return orang
}

async function groupStatus(sock, jid, content) {
    const inside = await generateWAMessageContent(content, {
        upload: sock.waUploadToServer
    })
    const messageSecret = crypto.randomBytes(32)
    const m = generateWAMessageFromContent(jid, {
        messageContextInfo: {
            messageSecret
        },
        groupStatusMessageV2: {
            message: {
                ...inside,
                messageContextInfo: {
                    messageSecret
                }
            }
        }
    }, {})
    await sock.relayMessage(jid, m.message, {
        messageId: m.key.id
    })
    return m
}

function ucpn() {
  const time = moment.tz("Asia/Jakarta").format("HH");
  let res = "Selamat Menjelang Pagi";
  if (time >= 4) {
    res = "Selamat Pagi";
  }
  if (time >= 10) {
    res = "Selamat Siang";
  }
  if (time >= 15) {
    res = "Selamat Sore";
  }
  if (time >= 18) {
    res = "Selamat Malam";
  }
  return res;
}
function Delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

function Reaction(q, emoji, quotedd = m.key) {
conn.sendMessage(q, {
            react: {
                text: emoji,
                key: quotedd
            }
        })
}

     // Pengubah Function Jadi Global //
global.rafitampilan = RafiTampilan
global.rafimenu = RafiMenu
global.rafimusik = global.musik = RafiMusik
global.raficostum = RafiCostum
global.jadisticker = await Jadisticker
global.fotopp = Potopp
global.react = Reaction
global.mention = Mentions
global.swgc = groupStatus
global.ucapan = ucpn
global.groub = m.chat
global.delay = Delay
global.protoo = proto
global.sendd = generateWAMessageFromContent
}
export default handler