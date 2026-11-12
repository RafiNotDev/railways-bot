let rafiganteng = async ( m, { conn, text, args }) => {
if (!m.quoted) return rafitampilan('Reply Pesan Member Yang Akan Di Tambahin Exp Nya')
if (!text) return rafitampilan('Mau Nambah Berapa Exp')
let users = global.db.data.users
    users[m.quoted.sender].exp += text
    conn.reply(m.chat, `Sukses Menambah Exp @${m.quoted.sender.split('@')[0]} Sebesar ${text}`, m)
}
rafiganteng.help = rafiganteng.command = ['addexp']
rafiganteng.tags = ['owner']
rafiganteng.owner = true

export default rafiganteng