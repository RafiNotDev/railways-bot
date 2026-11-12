const { proto } = (await import('@adiwajshing/baileys')).default

let handler = async (m, { conn, text, command, usedPrefix }) => {
	let M = proto.WebMessageInfo;
	if (!m.quoted) throw `balas pesan dengan perintah *${usedPrefix + command}*`;
	if (!text) throw `penggunaan: ${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} tes`;
	let msgs = db.data.chats[m.chat].listStr
	if (text in msgs) throw `'${text}' telah terdaftar di List store`
	msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON()
	rafitampilan(m.chat,`berhasil menambahkan ${text} ke List Store.\n\nakses dengan mengetik namanya`)
}
handler.help = ['list'].map(v => 'add' + v + ' <teks>')
handler.tags = ['group']
handler.command = /^(addlist|addstore)$/i

handler.group = true
handler.admin = true

export default handler