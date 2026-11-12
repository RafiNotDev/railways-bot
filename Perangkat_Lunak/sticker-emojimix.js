import { sticker } from "../Perangkat_Keras/Komponen/sticker.js"
import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text || !text.includes('+')) throw `Usage : ${usedPrefix + command} emoji1|emoji2\n\nExample: *${usedPrefix + command} 😅+🤔*`
    let [l, r] = text.split`+`
    if (!l) throw 'emoji1 tidak boleh kosong'
    if (!r) throw 'emoji2 tidak boleh kosong'
    const url = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(l)}_${encodeURIComponent(r)}`)
    if (!url.ok) throw await url.text()
    let json = await url.json()
    if (!json.results) throw 'Error!'
    try {
    await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
    	let res = json.results[0].url
    	let imagebuffer = await Buffer.from(res)
    	let Stiker = await sticker(imagebuffer)
      conn.sendFile(m.chat, Stiker, 'hasil.webp', { asSticker: true }, m)
    } catch (e) {
        console.log(e)
        m.reply('Error Bangkuu..')
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key }})
    } finally {
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
    }
}

handler.help = ['emojimix <1>|<2>']
handler.tags = ['tools']
handler.command = /^(emojimix)$/i
export default handler