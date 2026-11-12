let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
        global.db.data.users[m.sender].money = 0
        global.db.data.users[m.sender].diamond = 0
        global.db.data.users[m.sender].exp = 0
        m.reply(`*Berhasil Menghapus Cheat*\nSekarang Money, Diamond, Sama Exp Anda Jadi 0`)
}
handler.tags = ['owner']
handler.help = ['delcheat']
handler.command = /^(hapuscheat|delcheat|resetulang)$/i
handler.owner = true

export default handler