import fetch from 'node-fetch'
import { sticker } from '../Perangkat_Keras/Komponen/sticker.js'

let handler = async (m, { conn, text }) => {
    if (!text || !text.trim()) throw 'Masukkan teks yang valid!'

    try {
         await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
         let url = `https://api-faa.my.id/faa/bratvid?text=${encodeURIComponent(text.trim())}`
        let res = await fetch(url)
        if (!res.ok) throw `Gagal mengambil gambar dari API! Status: ${res.status}`

        let imageBuffer = await res.buffer()
        let stiker = await sticker(imageBuffer)

        await conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
    } catch (err) {
        console.error('Error:', err.message || err)
        await conn.sendMessage(m.chat, { text: `Error: ${err.message || 'Gagal mengambil gambar.'}` }, { quoted: m })
    } finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}

handler.help = ['bratvid']
handler.tags = ['sticker']
handler.command = ['bratvid','bratvids','bratvideo']
export default handler