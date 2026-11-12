import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'

let handler = async (m, { conn, text }) => {
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

if (!m.isGroup) return conn.reply(m.chat, 'Fitur ini hanya bisa digunakan di dalam grup!', m)

  const participants = (await conn.groupMetadata(m.chat)).participants

  let randomUser = null;

  if (!text) {
    randomUser = getRandomElement(participants).id
  } else {
    const mentionedUser = text.match(/@([0-9]{7,16})/);  // Regex untuk menangkap mention ID
    if (mentionedUser) {
      const mentionedUserId = mentionedUser[1]
      randomUser = participants.find(user => user.id.includes(mentionedUserId))?.id
    }
  }

  if (!randomUser) return conn.reply(m.chat, 'Pengguna yang disebutkan tidak ditemukan!', m)

  let caption = `
	*CEK KONTOL*


_Nama Pasien:_ *@${randomUser.split('@')[0]}*
_Kontolnya:_ *${pickRandom(['Putih mulus','Putih','Hitam','berjemur','dekil','hitam berkarat'])}*
_Jembutnya:_ *${pickRandom(['Lebat','Tipis','Gada Jembut', 'Bersih'])}*
_Statusnya:_ *${pickRandom(['perjaka','Ga perjaka','Besar','Panjang','Disunat','Blom Disunat'])}*`


  conn.reply(m.chat, caption, m, { mentions: [randomUser] })
}

handler.help = ['cekkontol']
handler.tags = ['fun']
handler.command = /^(cekkontol|cekktl|cekkon)$/i
handler.group = true

export default handler