let handler = async (m, { conn, text }) => {
  if (!text) throw 'Tidak ada teks'
  let teks = await mention(text)
  let pesan = 
  conn.reply(m.chat, `@${teks.split("@")[0]}`, m, { mentions: [teks] })
}
handler.help = ['mention <teks>']
handler.tags = ['tools']

handler.command = /^mention$/i
handler.group = true
export default handler 
