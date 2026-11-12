import { createHash } from 'crypto'
let handler = async function (m, { args, usedPrefix, command }) {
    if (!args[0]) return rafitampilan(m.chat, `📮Serial Number kosong, Silahkan Cek Serial Number Di\n${usedPrefix}ceksn`)
    let user = global.db.data.users[m.sender]
    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 12)
    if (args[0] !== sn) return rafitampilan(m.chat, `🚫 Serial Number salah!, Silahkan Cek Serial Number Di\n${usedPrefix}ceksn`)
    rafitampilan(m.chat, '📛 Kamu Berhasil keluar dari Database BOT!').then(() => {
        user.registered = false
        user.unreg = true
    })
}
handler.help = ['unreg']
handler.tags = ['xp']
handler.command = /^unreg(ister)?$/i
handler.register = true

export default handler