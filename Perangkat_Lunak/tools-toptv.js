let Rafiganteng = async (m, {
    conn,
    text,
    usedPrefix,
    command,
    participants
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!q) return m.reply('Media Videonya Mana?\nMohon Untuk Reply Videonya')
    if (!/video/g.test(mime)) return m.reply('Maaf Fitur Ini Hanya Untuk Media Video')
    let media = await q.download?.()
    conn.sendMessage(m.chat, {
        video: media,
        caption: '',
        ptv: true
    }, {
        quoted: m
    })
}
Rafiganteng.command = /^(toptv)$/i
Rafiganteng.tags = ['tools']
Rafiganteng.help = ['toptv']
export default Rafiganteng