const isToxic = /anjing|babi|asu|memek|pepek|colmek|coli|ngentot|ngocok|kontol|unggeh|asyu|mmk|kntol|entod|pantek|tai|bangsat|bhangsat|taik|ptk/i

export async function before(m, { conn, args, usedPrefix, command, text, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/itl427.jpg')
    let bot = global.db.data.settings[this.user.jid] || {}
    const isAntiToxic = isToxic.exec(m.text)
    let hapus = m.key.participant
    let bang = m.key.id
    let caption = `[❗] *Terdeteksi* Kakak ${m.sender.split("@")[0]} Berkata Toxic\n\n Jangan Toxic Lagi Kak\n Soalnya Admin Atau Owner Group Mangaktifkan Fitur Antitoxic\n Dan Pesan Kakak Bakal Bot Hapus ${isBotAdmin ? '.' : 'Tapi Bot Bukan Admin'}`
    
    if (chat.antiToxic && isAntiToxic) {
            rafitampilan(m.chat, caption, m)
        if (isBotAdmin) {
            await conn.sendMessage(m.chat, { delete: m.key })
            return !1
        }
    }
    return !0
}

export const disable = true