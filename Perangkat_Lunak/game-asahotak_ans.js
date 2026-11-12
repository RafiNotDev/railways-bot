import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (m.isBaileys || m.fromMe) return
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/Ketik.*hotak|ᴋᴇᴛɪᴋ.*hotak/i.test(m.quoted.text) || /.*(hotak|bantuan)|.*(hotak|bantuan)/i.test(m.text))
        return !0
    this.asahotak = this.asahotak ? this.asahotak : {}
    let setting = global.db.data.settings[conn.user.jid]
        await this.sendPresenceUpdate('composing', m.chat)
        await this.readMessages([m.key])
    if (!(id in this.asahotak))
        return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.asahotak[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.asahotak[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.asahotak[id][2]
            global.db.data.users[m.sender].money += 10000
            global.db.data.users[m.sender].limit += 2
            await rafitampilan(m.chat, `
╔═══════════━──⪼
║ *Jawaban Kamu*
╠⪼ ${json.jawaban}
║  Wah Ternyata Benar✅
╚═══════════━──⪼
╔═══════════━──⪼
║ *Selamat Kak ${m.pushName}*
║ _Kamu mendapatkan_
╠──────────────⪼
║ *Money* 💰 = Rp10.000
╠──────────────⪼
║ *Limit* 💳 = 2
╠──────────────⪼
║ *XP* 🎗️= 5.000
╚═══════════━──⪼
Developer: @${nodev}`)
            clearTimeout(this.asahotak[id][4])
            delete this.asahotak[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`)
        } else if (--this.asahotak[id][3] == 0) {
            clearTimeout(this.asahotak[id][4])
            delete this.asahotak[id]
            let jsonn = JSON.parse(JSON.stringify(this.asahotak[id][1]))
            conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${jsonn.jawaban}*`, m)
        } else m.reply(`╔═══════════━──⪼
║ *Jawaban Kamu*
╠⪼ ${m.text}
║  Wah Ternyata Salah❌
╚═══════════━──⪼\nUpss!! Tenang🤫 Masih ada ${this.asahotak[id][3]} kesempatan Lagi`)
    }
    return !0
}
export const exp = 0