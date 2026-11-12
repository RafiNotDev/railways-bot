import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (m.isBaileys || m.fromMe) return
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/Ketik.*calo|ᴋᴇᴛɪᴋ.*ᴄᴀʟᴏ/i.test(m.quoted.text) || /.*(calo|bantuan)|.*(ᴄᴀʟᴏ|ʙᴀɴᴛᴜᴀɴ)/i.test(m.text))
        return !0
    this.caklontong = this.caklontong ? this.caklontong : {}
    let setting = global.db.data.settings[conn.user.jid]
    if (setting.composing)
        await this.sendPresenceUpdate('composing', m.chat)
    if (setting.autoread)
        await this.readMessages([m.key])
    if (!(id in this.caklontong))
        return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.caklontong[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.caklontong[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.caklontong[id][2]
            global.db.data.users[m.sender].money += 10000
            global.db.data.users[m.sender].limit += 2
            await rafitampilan(`
╔═══════════━──⪼
║ *Jawaban Kamu*
╠⪼ ${json.jawaban}
║  Wah Ternyata Benar✅
║  Karena: ${json.deskripsi}
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
            clearTimeout(this.caklontong[id][4])
            delete this.caklontong[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`)
        } else if (--this.caklontong[id][3] == 0) {
            clearTimeout(this.caklontong[id][4])
            delete this.caklontong[id]
            conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${json.jawaban}*`, m)
        } else m.reply(`╔═══════════━──⪼
║ *Jawaban Kamu*
╠⪼ ${m.text}
║  Wah Ternyata Salah❌
╚═══════════━──⪼\nUpss!! Tenang🤫 Masih ada ${this.caklontong[id][3]} kesempatan Lagi`)
    }
}
export const exp = 0