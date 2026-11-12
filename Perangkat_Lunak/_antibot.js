let handler = m => m

handler.before = async function (m, {conn, isAdmin, isBotAdmin}) {
if (!m.isGroup) return 
//if (m.fromMe && m.isBaileys) return !0

  let chat = global.db.data.chats[m.chat];
  if (chat.antiBot) { 
    if (m.isBaileys) {
  await rafitampilan(m.chat, `*[ BOT LAIN TERDETEKSI ]*\nBot Tersebut Tidak Admin, Maka Bot Kami Kick${isBotAdmin ? `.` : ` Tapi Aku Tidak Admin Kak, Gak Bisa Bertindak😔`}`, m);
if (!isAdmin && isBotAdmin) {
  await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");  
}
}
}
}

export default handler