let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `Use example ${usedPrefix}${command} rafi`
    conn.reply(m.chat, `
${command} *${text}*
*${text}* adalah *${(101).getRandom()}*% ${command.replace('berapa', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? { mentions: m.mentionedJid } : {})
}
handler.help = ['gay', 'pintar', 'cantik', 'ganteng', 'gabut', 'gila', 'lesbi', 'stress', 'bucin', 'jones', 'sadboy'].map(v => 'berapa' + v)
handler.tags = ['fun']
handler.command = /^berapa(gay|pintar|cantik|ganteng|gabut|gila|lesbi|stress?|bucin|jones|sadboy)/i

export default handler