let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!m.quoted) return m.reply(`Reply Chat Orang Yang Bakaln di Ikhlasin! \n\nContoh : \n${usedPrefix + command} Sambil Reply Pesan Nya`, false, { mentions : [m.sender] })
  
  let who = m.quoted.sender
  let user = global.db.data.users
  if (user[m.sender].tembak == "") return conn.reply(m.chat, `Kamu Sedang Tidak Menembak Siapapun!`, m)
  if (user[m.sender].pacar == m.sender) return conn.reply(m.chat, `Kamu Telah Berpacaran Dengan @${user[m.sender].pacar.split('@')[0]}`, m, {contextInfo: {
    mentionedJid: [user[m.sender].pacar]
  }})
  conn.reply(m.chat, `Kamu Sudah Mengikhlaskan @${user[m.sender].tembak.split('@')[0]} Karena Dia Tidak Memberikan Jawaban Diterima Atau Ditolak`, m, {contextInfo: {
    mentionedJid: [user[m.sender].tembak]
  }})
  user[m.sender].tembak = ""
  user[who].tembak = ""
  user[who].ditembak = false
}
handler.help = ['ikhlasin']
handler.tags = ['group']
handler.command = /^(ikhlasin|ikhlas)$/i
handler.group = true
export default handler