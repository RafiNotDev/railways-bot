export async function before(m, { isAdmin, isBotAdmin, conn }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let sender = global.db.data.chats[m.sender]
  let isFoto = m.mtype
  let hapus = m.key.participant
  let bang = m.key.id
  if (chat.antiFoto && isFoto) {
    if(isFoto === "imageMessage") {
        if (isAdmin) return rafitampilan(m.chat, `[❗] *Terdeteksi Admin @${m.sender.split`@`[0]} Kirim Foto!*\nAturan Group Gak Berlaku Sama Admin`, m)
        
        rafitampilan(m.chat, `*Foto Terdeteksi*\n\nMaaf Ya Kak @${m.sender.split`@`[0]}, fotonya Harus ${global.setting.namabot} Hapus Karna Di Admin/Owner Mengaktifkan Anti Foto Untuk Chat Ini.`, m)
        if (isBotAdmin) {
     this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
        }
        
        return true
    }
  }
  return true
}