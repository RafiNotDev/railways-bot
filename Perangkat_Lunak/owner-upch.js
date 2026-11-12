const handler = async (m, { conn, text }) => {
if(!m.quoted) return m.reply('Harus Reply Media Kak Atau Kata Kata')
try {
await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	let kirim = setting.idch
	if (/video/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(kirim, { video: media, caption: m.quoted.text || text }, { quoted: m })
	} else if (/image/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(kirim, { image: media, caption: m.quoted.text || text }, { quoted: m })
    } else if (/audio/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(kirim, { audio: media, mimetype: 'audio/mpeg' }, { quoted: m });
	} else {
conn.sendMessage(kirim, { text: q.text
}, { quoted: m });
}
} finally {
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
    rafitampilan(`✅ Sukses mengirim pesan ke channel!\nSilahkan Akses Link Berikut:\n${setting.linkch}`)
}
}

handler.tags = ['tools'];
handler.command = /^(upch)$/i;
handler.rowner = true;

export default handler