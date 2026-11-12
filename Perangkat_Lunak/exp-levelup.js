import { canLevelUp, xpRange } from '../Perangkat_Keras/Komponen/levelling.js'
import moment from 'moment-timezone'
import fs from "fs"

let handler = async (m, { conn }) => {
    try {
        let user = global.db.data.users
        if (!canLevelUp(user[m.sender].level, user[m.sender].exp, 38)) {
            let { min, xp, max } = xpRange(user[m.sender].level, 38)
            return m.reply(`
Level ${user[m.sender].level} 📊
*${user[m.sender].exp - min} / ${xp}*
Kurang *${max - user[m.sender].exp}* lagi! ✨
`.trim())
        }
        await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
        let before = user[m.sender].level * 1
        while (canLevelUp(user[m.sender].level, user[m.sender].exp, 38)) user[m.sender].level++
        if (before !== user[m.sender].level) {
            let str = `
*🎉 C O N G R A T S 🎉*
*${before}* ➔ *${user[m.sender].level}* [ *${user[m.sender].role}* ]

*Note:* _Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_
`.trim()
            let member = Object.keys(user).filter(v => user[v].level > 0).sort((a, b) => {
                const totalA = user[a].level
                const totalB = user[b].level
                return totalB - totalA;
            })
            let { min, xp, max } = xpRange(user[m.sender].level, 38)
            const pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/itl427.jpg')
            const name = user[m.sender].registered ? user[m.sender].name: conn.getName(m.sender)
            try {
                await conn.sendMessage(m.chat, {
            text: str,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                   externalAdReply: {
                   title: `${name}`,
                   body: `Naik Level: ${user[m.sender].level}`,
                   thumbnailUrl: pp,
                   sourceUrl: '',
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },
                },
            }, { quoted: m })
            } catch (e) {
                await conn.sendMessage(m.chat, {
            text: str,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                   externalAdReply: {
                   title: `${name}`,
                   body: `Naik Level: ${user[m.sender].level}`,
                   thumbnailUrl: pp,
                   sourceUrl: '',
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },
                },
            }, { quoted: m })
            }
        }
    } catch (e) {
        throw e
    } finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}

handler.help = ['levelup']
handler.tags = ['xp']
handler.command = /^level(|up)$/i

export default handler