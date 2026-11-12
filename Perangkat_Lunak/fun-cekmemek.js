import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'

let handler = async (m, { conn, text }) => {
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

  let caption = `
	*CEK MEMEK*
	

_Nama Pasien:_ *@user*
_Memeknya:_ *${pickRandom(['Putih mulus','Hitam','Pink','Pink Mulus','Hitam mulus','berjemur'])}*
_Jembutnya:_ *${pickRandom(['Lebat','Tipis','Gada Jembut', 'Bersih'])}*
_Lobangnya:_ *${pickRandom(['Perawan','Ga Perawan','Besar','Sempit'])}*
`

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

  const selectedMessage = caption.replace(/@user/g, `@${randomUser.split('@')[0]}`)

  conn.reply(m.chat, selectedMessage, m, { mentions: [randomUser] })
}

handler.help = ['cekmemek']
handler.tags = ['fun']
handler.command = /^(cekmemek|cekmmk)$/i
handler.group = true

export default handler