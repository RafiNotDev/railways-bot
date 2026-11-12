let handler = async (m, { text }) => {
    let user = global.db.data.users[m.sender]
    user.afk = +new Date()
    user.afkReason = text
    let k = `➠ @${m.sender.split`@`[0]} AFK Dengan Alasan ${text ? ': ' + text : 'Tanpa Alasan'}`
    conn.sendMessage(m.chat, {
            text: k,
            contextInfo: {
                mentionedJid: conn.parseMention(k),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: setting.idch,
                   serverMessageId: null,
                   newsletterName: setting.namach,
                   },
                  
                },
            }
            )
}
handler.help = ['afk']
handler.tags = ['main']
handler.command = /^afk$/i
handler.group = true

export default handler