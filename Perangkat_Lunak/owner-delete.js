let handler = async (m, { conn, isOwner, isAdmin, isBotAdmin }) => {
	if (!m.quoted) throw 'Reply Chat Yang Bakal Di Hapus'
	let { chat, fromMe } = m.quoted
	let charm = global.db.data.chats[m.chat]
	if(!isAdmin && !isOwner) return global.dfail('Admin', m, conn)
	if (!isBotAdmin && !fromMe) return m.reply('Maaf Bot Tidak Admin Dan Chat Tersebut Tidak Dari Bot, Bot Tidak Bisa Bertindak')
	try {
	await conn.sendMessage(m.chat, { react: { text: '🚮', key: m.key }})
	if(!isBotAdmin) {
	return conn.sendMessage(m.chat, { delete: m.quoted.vM.key });
	} else if(isBotAdmin) {
    return conn.sendMessage(chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender } })
}
} finally {
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
}
handler.help = ['delete']
handler.tags = ['group']
handler.command = /^(d|delete|del|h|hapus|hap)$/i
export default handler