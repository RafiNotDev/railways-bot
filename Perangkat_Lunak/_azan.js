import fs from 'fs'
let handler = async (m, { conn, usedPrefix, command }) => {
    let azan = 'https://media.vocaroo.com/mp3/1ofLT2YUJAjQ'

await conn.sendMessage(m.chat, { 
                audio: {url: azan}, 
                mimetype: "audio/mpeg",
                ptt: false,
                contextInfo: {
mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: global.setting.idch,
      serverMessageId: 103,
      newsletterName: global.setting.namach
    },
    externalAdReply: {
title: `Judul Sound`, 
body: 'Suara Adzan Merdu', 
sourceUrl: "https://wa.me/6282286315998?text=Mau%bot%dong%kak",
thumbnailUrl: 'https://files.catbox.moe/at2m4v.jpg', 
renderLargerThumbnail: false
}, 
}}, { quoted: m })
}
handler.customPrefix = /^(adzan|azan|azan oi|adzan oi|azan woi|adzan woi|)$/i
handler.command = new RegExp
export default handler