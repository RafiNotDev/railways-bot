export async function before(m, { isAdmin, isBotAdmin, conn }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let sender = global.db.data.chats[m.sender]
  let isAudio = m.mtype
  let hapus = m.key.participant
  let bang = m.key.id
  if (chat.antiAudio && isAudio) {
    if(isAudio === "audioMessage"){
        if (isAdmin) {
        await conn.sendPresenceUpdate('composing', m.chat)
         rafitampilan(m.chat, '[❗] *Terdeteksi Admin Kirim Link Tiktok*\nTapi Peraturan Gak Berlaku Sama Admin Ya Kak', m)
        }
        await conn.sendPresenceUpdate('composing', m.chat)
          rafitampilan(m.chat, `*Audio Terdeteksi*\n\nMaaf Ya Kak Pesannya Harus aku Hapus Karna Admin/Owner Mengaktifkan Anti Audio Untuk Chat Ini.`, m)
          if (isBotAdmin) {
    return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
            }
        }
  }
  return true
}