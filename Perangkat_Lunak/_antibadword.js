let badwordRegex = /anjing|babi|asu|memek|pepek|colmek|coli|ngentot|ngocok|kontol|unggeh|asyu|mmk|kntol|entod|pantek|ptk/i
export async function before(m, { conn, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return 
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let isBadword = badwordRegex.exec(m.text)
    let toxic = `${user.warning >= 5 ? '*📮 Warning Kamu Sudah Mencapai 5 Maka Kamu Akan Dikick!*' : '*📮 Kata Kata Toxic Terdeteksi*'}

${global.setting.namabot} Memberi Peringatan: ${user.warn} / 5

[❗] Jika *${global.setting.namabot}* sudah memperingatkanmu sebanyak 5x. Kamu akan dikeluarkan dari group ini.

“Barang siapa yang beriman kepada Allah dan Hari Akhir maka hendaklah dia berkata baik atau diam” (HR. al-Bukhari dan Muslim).`
    if (chat.antiBadword && isBadword && m.isGroup) {
        user.warn += 1
        rafitampilan(m.chat, toxic, m)
        if (user.warn >= 5) {
            user.warn = 0
            conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }
    }
    return !0
}