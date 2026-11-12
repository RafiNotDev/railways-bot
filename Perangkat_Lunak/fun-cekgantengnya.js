let handler = async (m, { conn, command, text }) => {
  let caption = `
  *CEK KEGANTENGAN*
  

> _Nama Pasien:_ *@user*

> _Level:_ *${pickRandom(['4% INI MUKA ATAU SAMPAH?!','7% Serius ya,, Lu ampir mirip kayak Monyet!','12% Makin lama liat muka lo gw bisa muntah!','22% Mungkin karna lo sering liat berbuat maksiat😂','27% Keknya bakal susah dapet jodoh lu,, berdoa aja','35% Yang sabar ya ayang','41% Semoga diberkati mendapat jodoh','48% Dijamin cewek susah deketin lo','56% Lu Setengah ganteng :v','64% Cukuplah','71% Lumayan ganteng juga lu ya','1% AWOAKAK BURIQQQ!!!','77% Gak akan Salah Lagi dah mas','83% Dijamin cewek gak akan kecewa mas','89% cewek2 pasti auto salfok klo ngeliat lo!','94% AARRGGHHH!!!','100% LU EMANG COWOK TERGANTENG YANG PERNAH GW LIAT!!!'])}*
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
handler.help = ['cekgantengnya']
handler.tags = ['fun']
handler.command = /^cekgantengnya/i

export default handler

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}