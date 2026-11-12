import fetch from 'node-fetch'

let handler = async (m, {
    conn,
    command
}) => {
    let res = await fetch('https://raw.githubusercontent.com/BadXyz/txt/main/citacita/citacita.json')
    let json = await res.json()
    conn.sendMessage(m.chat, { 
    audio: {url: json.getRandom()},
    mimetype: "audio/mpeg",
    ptt: false, 
    fileName: "rafihacker.mp3",
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
title: global.setting.namabot, 
body: `Developer Bot: @${global.nodev}`, 
sourceUrl: "https://wa.me/6282286315998?text=Mau%bot%dong%kak",
thumbnailUrl: global.setting.tampilan, 
renderLargerThumbnail: false
}, 
}}, { quoted: m })
}
handler.help = ['citacita']
handler.tags = ['fun']
handler.command = /^(citacita)$/i

export default handler