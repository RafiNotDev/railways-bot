export async function before(m, { isAdmin, isBotAdmin, conn }) {
  if (m.isBaileys && m.fromMe) return !0
  let chat = global.db.data.chats[m.chat]
  let isPolling = m.mtype
  let hapus = m.key.participant
  let bang = m.key.id
  if (chat.antiPolling && isPolling) {
    if(isPolling === "pollCreationMessageV3"){
        if (!isBotAdmin || isAdmin){		  
        } else {
          rafitampilan(m.chat, `*Terdeteksi @${m.sender.split`@`[0]} mengirim Polling*\n\nmaaf ya Kak Polling yang kamu kirim akan ${global.setting.namabot} hapus, karna admin mengaktifkan Antipolling.`, m)
    return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
        } return !1
    }
  }
}