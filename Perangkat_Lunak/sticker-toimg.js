import { webp2img } from "../Perangkat_Keras/Komponen/ezgif-convert.js"
import uploadFile from "../Perangkat_Keras/Komponen/uploadFile.js";
import uploadImage from "../Perangkat_Keras/Komponen/uploadImage.js";
import fetch from "node-fetch"
let handler = async (m, { conn, usedPrefix, command }) => {
  const notStickerMessage = `Reply sticker dengan command *${usedPrefix + command}*`;

  if (!m.quoted) throw notStickerMessage;
  const q = m.quoted || m;
  const mime = q.mimetype || '';

  if (!/image\/webp/.test(mime)) throw notStickerMessage;

  try {
            let media = await q.download()
            let nama = `${q.id}.jpg`
            let tourl = await (uploadImage ? uploadImage : uploadFile)
            let convert = fetch(tourl)
                await conn.sendFile(m.chat, convert, nama, m)
  } catch (error) {
    console.error(error);
    if (error.message === 'Timeout of 10000ms exceeded') {
      m.reply('Proses konversi terlalu lama. Silakan coba lagi.');
    } else {
      m.reply('error Bang');
    }
  }
};

handler.help = ['toimg'];
handler.tags = ['sticker'];
handler.command = ['toimg', 'toimage'];

export default handler;