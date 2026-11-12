let handler = async (m, { conn, args }) => {
	let list = Object.entries(global.db.data.users)
	let lim = !args || !args[0] ? 3 : isNumber(args[0]) ? parseInt(args[0]) : 3
	lim = Math.max(1, lim)
	list.map(([user, data], i) => (Number(data.limit = lim)))
		rafitampilan(m.chat, `*berhasil direset ${lim} / user*`)
}
handler.help = ['limit'].map(v => 'reset' + v)
handler.tags = ['owner']
handler.command = /^(resetlimit)$/i

handler.rowner = true

export default handler 

function isNumber(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}