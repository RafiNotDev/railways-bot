import axios from 'axios'

let handler = async (m, { conn }) => {
try {
    await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
m.reply('[❗] *Memproses Permintaan Anda...*\nBot Menghapus Latar Belakang Foto Anda...')
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  if (!mime.startsWith('image/')) throw 'Mana Gambar Nya'

  let buffer = await q.download()
  let base64 = `data:${mime};base64,${buffer.toString('base64')}`

  let { data } = await axios.post('https://background-remover.com/removeImageBackground', {
    encodedImage: base64,
    title: `Fiony-${Math.floor(Math.random() * 99999)}.${mime.split('/')[1] || 'jpg'}`,
    mimeType: mime
  }, {
    headers: {
      'accept': '*/*',
      'content-type': 'application/json; charset=utf-8',
      'referer': 'https://background-remover.com/upload'
    }
  })

  let result = data.encodedImageWithoutBackground?.split(',')[1]
  await conn.sendMessage(m.chat, {
    image: Buffer.from(result, 'base64'),
  }, { quoted: m })
 } finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}

handler.help = ['removebg']
handler.command = ['removebg','rmbg','hapulatarbelakang']
handler.tags = ['tools']

export default handler