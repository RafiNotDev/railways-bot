import { webp2mp4File } from "../Perangkat_Keras/Komponen/converter2.js"

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let notStickerMessage = `Kirim/Balas Sticker Dengan Command *${usedPrefix + command}*`
        if (!m.quoted) return m.reply(notStickerMessage)
        let q = m.quoted ? m.quoted : m
        let mime = q.mediaType || ''
        if (!/sticker/.test(mime)) return m.reply(notStickerMessage)
        await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
        let media = await q.download(true)
        let { result } = await webp2mp4File(media)
        let { data } = await conn.getFile(result)
        await conn.sendFile(m.chat, data, '', '', m)
    } finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}
handler.help = ['tovideo']
handler.tags = ['sticker']
handler.command = /^(to(vid(eo)?|mp4))$/i
export default handler