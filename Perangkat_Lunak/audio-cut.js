import { unlinkSync, readFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'

let handler = async (m, { conn, __dirname, args, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted: m
        let mime = (q.msg || q).mimetype || ''
        if (!/audio/.test(mime)) return rafitampilan(m.chat, `Balas vn/audio yang ingin diubah dengan caption *${usedPrefix + command}*`)
        if (!args[0] || !args[1]) return rafitampilan(m.chat, `${usedPrefix + command} 00:00:30 00:00:30`)
        await await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
        let ran = '.mp3'
        let filename = join(__dirname, '../Cache/Sampah/' + ran)
        let media = await q.download(true)
        exec(`ffmpeg -ss ${args[0]} -i ${media} -t ${args[1]} -c copy ${filename}`, async (err) => {
            await unlinkSync(media)
            if (err) return m.reply(`_*Error!*_`)
            let buff = await readFileSync(filename)
            await conn.sendFile(m.chat, buff, ran, null, m, false, {
                mimetype: 'audio/mpeg'
            })
        })
    } finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}
handler.help = ['cutaudio']
handler.tags = ['audio']
handler.command = /^(potong(audio|mp3)|cut(audio|mp3))$/i

export default handler