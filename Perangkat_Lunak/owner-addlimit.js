let handler = async (m, { conn, command, text, args }) => {
    if (!m.isGroup) return
    let sender = await mention(m.quoted?.sender || args[0])
    if (!args[0]) return m.reply('reply pesan member atau tag member yang bakal di tambahin limitnya')
    let ulimit = parseInt(args[1])
    if (!ulimit) return m.reply("Mau Berapa Limit Ngab")
    let users = global.db.data.users
    users[sender].limit += ulimit
    rafitampilan(m.chat, `Sukses Menambah Limit @${sender.split('@')[0]} Sebesar ${ulimit} Limit`)
}
handler.help = ['addlimit']
handler.tags = ['owner']
handler.command = /^addlimit(user)?$/i
handler.owner = true

export default handler

function isNumber(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}