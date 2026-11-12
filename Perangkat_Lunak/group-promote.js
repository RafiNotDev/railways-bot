import { areJidsSameUser } from '@adiwajshing/baileys'
let handler = async (m, { conn, participants, command, text }) => {
   let user = await mention(text)
switch ( command ) {
case "promote": {
    if (!(m.quoted || text)) return m.reply("Tag Atau Reply Pesan Member Yang Akan Di Angkat Jadi Admin Group")
    conn.groupParticipantsUpdate(m.chat, [user], 'promote')
    rafitampilan(m.chat, `Selamat Kakak @${user.split("@")[0]} Telah Di Promosikan Menjadi Admin Group`)
}
break
case "demote": {
if (!(m.quoted || text)) return m.reply("Tag Atau Reply Pesan Member Yang Akan Di Turunkan Jadi Admin Group")
    conn.groupParticipantsUpdate(m.chat, [user], 'demote')
    rafitampilan(m.chat, `Selamat Kakak @${user.split("@")[0]} Telah Di PHK Menjadi Admin Group`)
}}
}
handler.help = ['promote', 'demote']
handler.tags = ['group']
handler.command = /^(promote|demote)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))