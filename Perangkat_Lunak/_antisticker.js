export async function before(m, { isAdmin, isBotAdmin, conn }) {
    if (m.isBaileys && m.fromMe) return 
    let chat = global.db.data.chats[m.chat]
    let isSticker = m.mtype
    if (chat.antiSticker && isSticker === "stickerMessage" && m.isGroup) {
		if (isAdmin) return rafitampilan(m.chat, `[ ❗ ] Terdeteksi Admin @${m.sender.split`@`[0]} Kirim Sticker\n\nPeraturan Group Gak Berlaku Sama Admin Ya Guys`, m)
		
        rafitampilan(m.chat, `*Sticker Terdeteksi*\n\nMaaf Ya @${m.sender.split("@")[0]}, stickernya Harus ${global.setting.namabot} Hapus Karna Di Admin/Owner Mengaktifkan Anti sticker Untuk Chat Ini ${isBotAdmin? '.' : 'Tapi Bot Bukan Admin Kak'}`, m)
        if (isBotAdmin) {
            await this.sendMessage(m.chat, { delete: m.key })
        }
    }
    return
}