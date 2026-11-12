import fetch from 'node-fetch'
let handler = async (m, {
    conn,
    usedPrefix,
    command,
    isROwner,
    isPembuat
}) => {
let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/itl427.jpg')
       if (isPembuat || isROwner) {
        rafitampilan(m.chat, `*Waduhh*, ${isPembuat ? `Developerku *${global.namadev}* Datang` : `Owner Utamaku *${setting.namaowner}* Datang`}, Ayo Tepuk Tangan Semua`, m)
        conn.sendMessage(m.chat, { 
                audio: { url: "https://files.catbox.moe/3gn224.mp3" }, 
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
    /*externalAdReply: {
title: "Tepuk Tangan", 
body: `${isPembuat ? `Developer: ${namadev}` : `Owner: ${setting.namaowner}`} Datang`, 
sourceUrl: setting.website,
thumbnailUrl: pp, 
renderLargerThumbnail: false
},*/ 
}}, { quoted: m })
        }
}
handler.customPrefix = /^(hallo|cihuy|p)$/i
handler.command = new RegExp
export default handler