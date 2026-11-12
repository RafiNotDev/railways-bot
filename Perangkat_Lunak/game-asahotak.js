import fs from 'fs'
let timeout = 120000
let poin = 5000
let handler = async (m, { conn, usedPrefix }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (id in conn.asahotak) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.asahotak[id][0])
    let src = JSON.parse(fs.readFileSync('./Storage/Json/asahotak.json', 'utf-8'))
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
Bantuan??, Ketik .hotak
Kalau Mau Jawab Replay Soalnya!!
`.trim()
    conn.asahotak[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin, 4,
        setTimeout(async () => {
            if (conn.asahotak[id]) await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.asahotak[id][0])
            delete conn.asahotak[id]
        }, timeout)
    ]
}
handler.help = ['asahotak']
handler.tags = ['game']
handler.command = /^asahotak/i
handler.group = true
handler.register = true
handler.game = true
export default handler