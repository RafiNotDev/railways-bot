let { generateWAMessageFromContent } = (await import('@adiwajshing/baileys')).default

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/video/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { video: media, caption: m.quoted.text }, { quoted: m })
	} else if (/image/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { image: media, caption: m.quoted.text }, { quoted: m })
    } else if (/audio/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { audio: media, mimetype: 'audio/mpeg' }, { quoted: m });
	}
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^((read)?viewonce|rvo|liat)$/i
handler.admin = true
export default handler