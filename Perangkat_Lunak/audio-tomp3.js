import { toAudio } from '../Perangkat_Keras/Komponen/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
 try {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) return rafitampilan(m.chat, `reply video/voice note you want to convert to audio/mp3 with caption *${usedPrefix + command}*`)
    let media = await q.download?.()
    if (!media) return rafitampilan(m.chat, 'Can\'t download media')
    //m.reply(wait)
    await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) return rafitampilan(m.chat, 'Can\'t convert media to audio')
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })
} finally {
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}
handler.help = ['tomp3 (reply)']
handler.tags = ['audio']
handler.command = /^(to(mp3|a(udio)?))$/i

export default handler