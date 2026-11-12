import fetch from "node-fetch"
let handler = async ( m, { text, conn, args }) => {
if (!text) return
let url = `https://www.sankavolereii.my.id/download/tiktok?apikey=planaai&url=${text}`
let buffer = await (await fetch(url)).json()
let result = buffer.result
let { title, duration, play, music, cover } = result
let video = Buffer.from(play)
try {
await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
conn.sendMessage(m.chat, {
            video: {url: video},
            caption: title,
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
title: "Title: " + title, 
body: "Durasi: " + duration, 
sourceUrl: text,
thumbnailUrl: setting.tampilan, 
renderLargerThumbnail: false
}, 
}}, { quoted: m })
} finally {
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
}
handler.help = handler.command = ['ttdl']
handler.tags = ['tools']
export default handler