import { sticker } from '../Perangkat_Keras/Komponen/sticker.js'
import axios from 'axios'
import uploadFile from '../Perangkat_Keras/Komponen/uploadFile.js'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

async function uguu(filePath) {
  try {
    const form = new FormData()
    form.append('files[]', fs.createReadStream(filePath))
    const { data } = await axios.post('https://uguu.se/upload', form, {
      headers: {
        ...form.getHeaders()
      }
    })
    return data.files[0].url
  } catch (err) {
    throw new Error(err.message)
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [atas, bawah] = text.split`|`
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ""
  if (!mime)
    throw `Balas media dengan perintah\n\n${usedPrefix + command} <teks atas>|<teks bawah>`
  let mediaBuffer = await q.download()
  let ext = mime.split('/')[1] || "png"
  let tempFile = path.join(process.cwd(), `./Cache/Sampah/temp_${Date.now()}.${ext}`)
  fs.writeFileSync(tempFile, mediaBuffer)
  
  try {
    let url = await uguu(tempFile)
  await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
    if (mime.startsWith("image/")) {
      let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas || " ")}/${encodeURIComponent(bawah || " ")}.png?background=${url}`
      let response = await axios.get(meme, { responseType: 'arraybuffer' })
      let Stiker = await sticker(response.data, false, stickpack, stickauth)
      await conn.sendFile(m.chat, Stiker, 'hasil.webp', { asSticker: true }, m)
    } else {
 rafiTampilan('Maaf Fitur Ini Lagi Error, Coba Kasih Tau Owner Bot Biar Bisa Di Fix Kak')
    }
  } finally {
    fs.unlinkSync(tempFile)
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}

handler.help = ["smeme <teks atas>|<teks bawah>"]
handler.tags = ["sticker"]
handler.command = /^(smeme)$/i
handler.limit = 5
export default handler