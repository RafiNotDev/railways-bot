let handler = async (m, { conn, text, participants }) => {
    let target = m.mentionedJid // Mengambil ID pengguna yang ditag
    if (!target) return conn.reply(m.chat, `Tag seseorang yang ingin kamu paksa, contoh: *ewe-paksa @tag*`, m)
    if (target === m.sender) return conn.reply(m.chat, `Kamu tidak bisa memaksa diri sendiri, ngenes amat!`, m)

    let __timers = (new Date - global.db.data.users[m.sender].lastngojek)
    let _timers = (5000 - __timers)
    let order = global.db.data.users[m.sender].ojekk
    let timers = clockString(_timers)
    let name = conn.getName(m.sender)
    let victim = `${target}`

    let user = global.db.data.users[m.sender]
    let targetUser = global.db.data.users[target]

    if (new Date - global.db.data.users[m.sender].lastngojek > 300000) {
        let randomaku1 = `${Math.floor(Math.random() * 10)}`
        let randomaku2 = `${Math.floor(Math.random() * 10)}`
        let randomaku4 = `${Math.floor(Math.random() * 5)}`
        let randomaku3 = `${Math.floor(Math.random() * 10)}`
        let randomaku5 = `${Math.floor(Math.random() * 10)}`

        let rbrb1 = (randomaku1 * 2)
        let rbrb2 = (randomaku2 * 10)
        let rbrb3 = (randomaku3 * 1)
        let rbrb4 = (randomaku4 * 15729)
        let rbrb5 = (randomaku5 * 20000)

        var zero4 = `${rbrb4}`
        var zero5 = `${rbrb5}`

        var dimas = `Mencoba mendekati @${victim} secara perlahan...`
        var dimas2 = `Mulai memaksa @${victim}, dia mulai meronta...`
        var dimas3 = `“Berhenti! Jangan!!” @${victim} berteriak sambil menangis...`
        var dimas4 = `“Ahhh... Aku tidak sanggup lagi...” @${victim} menyerah sepenuhnya...`

        var hsl = `
Hasil Akhir dari Ewe-Paksa oleh ${name} ke @${victim}:

Uang yang didapat: ${zero4}
Exp yang diperoleh: ${zero5}
Peringatan yang diterima: 1
Order selesai: 1
Total order sebelumnya: ${order}
`

        global.db.data.users[m.sender].warn += 1
        global.db.data.users[m.sender].money += rbrb4
        global.db.data.users[m.sender].exp += rbrb5
        global.db.data.users[m.sender].ojekk += 1

        setTimeout(() => {
            m.reply(`${hsl}`)
        }, 27000)

        setTimeout(() => {
            m.reply(`${dimas4}`)
        }, 25000)

        setTimeout(() => {
            m.reply(`${dimas3}`)
        }, 20000)

        setTimeout(() => {
            m.reply(`${dimas2}`)
        }, 15000)

        setTimeout(() => {
            m.reply(`${dimas}`)
        }, 10000)

        setTimeout(() => {
            m.reply('Mencari target untuk dipaksa...')
        }, 0)

        user.lastngojek = new Date * 1
    } else conn.reply(m.chat, `Kamu terlalu lelah untuk memaksa lagi! Istirahat dulu selama\n*${timers}*`, m)
}

handler.help = ['ewe-paksa @tag']
handler.tags = ['fun']
handler.command = /^(ewe-paksa|anu-paksa)$/i
handler.register = true

export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}