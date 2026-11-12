import axios from 'axios';
import { sticker } from '../Perangkat_Keras/Komponen/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!(text || m.quoted)) throw `Gunakan perintah ini dengan format: ${usedPrefix + command} <teks>`;
    let teks = text
    if (m.quoted) {
     teks = m.quoted.text
     }
    try {
        conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
        const url = `https://api-faa.my.id/faa/brathd?text=${encodeURIComponent(teks)}`;
        let response = await axios.get(url, { responseType: 'arraybuffer' })
      let Stiker = await sticker(response.data, false, stickpack, stickauth)
        await conn.sendMessage(m.chat, { sticker: Stiker }, { quoted: m });

    } catch (error) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key }})
        console.error('Error:', error);
        await conn.reply(m.chat, 'Maaf, terjadi kesalahan saat mencoba membuat stiker brat. Coba lagi nanti.', m);
    } finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
};

handler.help = ['brat'];
handler.tags = ['sticker'];
handler.command = ['brat','bret','brot','bratbrot','brit','bretbrot','bratbret']
handler.limit = 5
export default handler;