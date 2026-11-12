let { MessageType } = (await import('@adiwajshing/baileys')).default
let handler = async (m, { conn, text, usedPrefix, args }) => {
if (!(m.quoted || text)) return rafitampilan(m.chat, "Mohon Reply Pesan Atau Tag Pengguna Yang Akan Di Tambahkan Ke Premium", m)
if (m.quoted) {
    if(!text) return rafitampilan(m.chat, "Mau Berapa Hari Premium Nya", m)
    let sender = m.quoted.sender
  if (typeof db.data.users[m.quoted.sender] == 'undefined') throw 'Pengguna Belum Masuk DataBase'
  var jumlahHari = 86400000 * text
  // var jumlahHari = 1000 * text
  var now = new Date() * 1
  db.data.users[m.quoted.sender].premium = true
  if (now < db.data.users[m.quoted.sender].premiumTime) db.data.users[m.quoted.sender].premiumTime += jumlahHari
  else db.data.users[m.quoted.sender].premiumTime = now + jumlahHari
  conn.reply(m.chat,`*『 S U K S E S 』*\n\nBerhasil menambahkan akses premium kepada *@${sender.split('@')[0]}* selama *${text} hari*.`,m,{ contextInfo: { mentionedJid: [sender] } })

} else {
let nomor = await mention(args[0])
let Slimit = args[1]
if (typeof db.data.users[nomor] == 'undefined') throw 'Pengguna Belum Masuk DataBase'
  var jumlahHari = 86400000 * Slimit
  // var jumlahHari = 1000 * text
  var now = new Date() * 1
  db.data.users[nomor].premium = true
  if (now < db.data.users[nomor].premiumTime) db.data.users[nomor].premiumTime += jumlahHari
  else db.data.users[nomor].premiumTime = now + jumlahHari
  conn.reply(m.chat,`*『 S U K S E S 』*\n\nBerhasil menambahkan akses premium kepada *@${nomor.split('@')[0]}* selama *${Slimit} hari*.`,m,{ contextInfo: { mentionedJid: [nomor] } })
}
}
handler.help = ['addprem']
handler.tags = ['owner']
handler.command = /^(add(prem|premium)|prem)$/i
handler.owner = true
export default handler
