let handler = async (m, { text, usedPrefix, command }) => {
	if (!text) throw `gunakan *${usedPrefix}liststore* untuk melihat daftar pesan yg tersimpan.`
	let msgs = db.data.chats[m.chat].listStr
	if (!(text in msgs)) throw `'${text}' tidak terdaftar di daftar pesan.`
	delete msgs[text]
	rafitampilan(m.chat, `\n  [💬] berhasil menghapus pesan di daftar List dengan nama '${text}'.\n`, m)
}
handler.help = ['list'].map(v => 'del' + v + ' <teks>')
handler.tags = ['store', 'group']
handler.command = /^(dellist|dellstore)$/i
handler.admin = true
handler.group = true
export default handler