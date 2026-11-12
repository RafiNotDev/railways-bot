let handler = async (m, { conn, text, participants }) => {
    // if (participants.map(v=>v.jid).includes(global.conn.user.jid)) {
    if (m.isBaileys) return
    global.db.data.chats[m.chat].isBanned = true
    m.reply('[❗] *Perintah Di Terima..*\nGroup Ini Tidak Bisa Lagi pakai Bot')
    // } else m.reply('Ada nomor host disini...')
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^(banchat|bnc)$/i

handler.owner = true

export default handler