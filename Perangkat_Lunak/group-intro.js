import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {

let card = db.data.chats[m.chat].sWelcome
if(card === "") return m.reply('Maaf Kayaknya Kartu Intronya Belum Di Setting Deh')
let who = await mention(text)

  const selectedMessage = card.replace(/@user/g, `@${who.split('@')[0]}`)

  conn.reply(m.chat, selectedMessage, m, { mentions: [who] })
}
handler.help = ['intro']
handler.tags = ['group']
handler.command = /^(intro)$/i
handler.group = true
export default handler