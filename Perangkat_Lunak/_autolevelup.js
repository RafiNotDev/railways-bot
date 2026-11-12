import { canLevelUp, xpRange } from '../Perangkat_Keras/Komponen/levelling.js'
import moment from 'moment-timezone'
import fs from "fs"
export async function before(m, { usedPrefix }) {
    let user = global.db.data.users
    let chat = global.db.data.chats[m.chat]
    let setting = global.db.data.settings[this.user.jid]
    if (m.isBaileys || m.fromMe) 
        return
    if (chat.mute || chat.isBanned || user[m.sender].banned)
        return
    if (!m.text.startsWith(usedPrefix))
        return
    if (chat.autolevelup || user[m.sender].autolevelup) {
        if (canLevelUp(user[m.sender].level, user[m.sender].exp, 38)) {

            let before = user[m.sender].level * 1
            while (canLevelUp(user[m.sender].level, user[m.sender].exp, 38)) user[m.sender].level++
            if (before !== user[m.sender].level) {
                let str = `
*🎉 C O N G R A T S 🎉*
Nama: ${m.pushName}

Naik Ke Kelas => [ *${user[m.sender].role}* ]

*Note:* _Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_
`.trim()
                let member = Object.keys(user).filter(v => user[v].level > 0).sort((a, b) => {
                    const totalA = user[a].level
                    const totalB = user[b].level
                    return totalB - totalA;
                })
                let { min, xp, max } = xpRange(user[m.sender].level, 38)
                const pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/itl427.jpg')
                const name = user[m.sender].registered ? user[m.sender].name : this.getName(m.sender)
                try {
                    await rafitampilan(m.chat, str, m)
                } catch (e) {
                    await rafitampilan(m.chat, str, m)
                }
            }
        }
        return !0
    }
    return !0
}