import fs from 'fs'
let timeout = 120000
let poin = 5000
let handler = async (m, { conn, usedPrefix }) => {
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (id in conn.caklontong) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.caklontong[id][0])
    let src = JSON.parse(fs.readFileSync('./Storage/Json/caklontong.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
${json.soal}

====================
Timeout *${(timeout / 1000).toFixed(2)} detik*
Kalo Menang?
Dapat :
1. Money: Rp. 10.000
2. Exp   : ${poin}
3. Limit  : 2
4. Sayang Dari ${setting.namaowner}
====================
Note:
Bantuan??, Ketik .calo
Kalau Mau Jawab Replay Soalnya!!
`.trim()
    conn.caklontong[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin, 4,
        setTimeout(async () => {
            if (conn.caklontong[id]) await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*\nKarena: ${json.deskripsi}`, conn.caklontong[id][0])
            delete conn.caklontong[id]
        }, timeout)
    ]
}
handler.help = ['caklontong']
handler.tags = ['game']
handler.command = /^caklontong/i
handler.group = true
handler.register = true
handler.game = true
export default handler