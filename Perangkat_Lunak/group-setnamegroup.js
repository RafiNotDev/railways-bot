let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args) throw `Mau Diganti Pakai Nama Apa?\n\nContoh ${usedPrefix + command} Rafi Office`
  await conn.groupUpdateSubject(m.chat, `${args.join(" ")}`);
  m.reply('📮Sukses mengganti nama group')
}

handler.help = ['setnamegc <text>']
handler.tags = ['group']
handler.command = /^setnamegc$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler