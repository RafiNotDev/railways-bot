import PhoneNumber from 'awesome-phonenumber'
import fs from 'fs'
import moment from 'moment-timezone'
const handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
        const d = new Date(new Date + 3600000)
        const locale = 'id'
        const weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
        const week = d.toLocaleDateString(locale, {
            weekday: 'long'
        })
        const date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })

        const wibh = moment.tz('Asia/Jakarta').format('HH')
        const wibm = moment.tz('Asia/Jakarta').format('mm')
        const wibs = moment.tz('Asia/Jakarta').format('ss')
        const wktuwib = `${wibh} H ${wibm} M ${wibs} S`

        let who = m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
      ? m.quoted.sender
      : text
        ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
        : false;
  if (!who)
    return m.reply(
      `Reply atau tag orangnya! \n\nContoh : \n${usedPrefix + command} @${m.sender.split("@")[0]}`,
      false,
      { mentions: [m.sender] },
    );
        const user = global.db.data.users[who]
        const isMods = [conn.decodeJid(global.conn.user.id), ...global.owner.filter(([number, _, isDeveloper]) => number && isDeveloper).map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who)
        const isOwner = m.fromMe || isMods || [conn.decodeJid(global.conn.user.id), ...global.owner.filter(([number, _, isDeveloper]) => number && !isDeveloper).map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who)
        const isPrems = isOwner || new Date() - user.premiumTime < 0

        if (typeof user == 'undefined') return m.reply('Pengguna tidak ada didalam data base')
        const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/itl427.jpg')
        const bio = await conn.fetchStatus(who).catch(_ => 'Tidak Ada Bio')
        const { role, premium, money, level, limit, exp, lastclaim, registered, regTime, age } = user

        const name = conn.getName(who)
        const datePacaran = await dateTime(user.pacaranTime)
        const caption = `
– User Info

┌ • Username : @${who.split("@")[0]}
│ • Umur : ${user.registered ? age: ''}
│ • Status : ${isMods ? 'Developer': isOwner ? 'Owner': isPrems ? 'Premium User': user.level > 999 ? 'Elite User': 'Free User'}
│ • Bio : ${bio.status ? bio.status: bio}
│ • Hubungan : ${user.pacar != "" ? `Berpacaran dengan @${user.pacar.split("@")[0]} sejak ${datePacaran}`: "Tidak ada"}
└ • Link : https://wa.me/${who.split`@`[0]}

– RPG Info

┌ • Level : ${toRupiah(user.level)}
│ • Exp : ${toRupiah(user.exp)}
│ • Money : ${toRupiah(user.money)}
└ • Bank : ${toRupiah(user.bank)}

🌟 Premium : ${isPrems ? "✅": "❌"}
📑 Registered : ${user.registered ? '✅ ( ' + await dateTime(regTime) + ' )': '❌'}
`.trim()

        await await conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: {
                mentionedJid: conn.parseMention(caption),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                   /*externalAdReply: {
                   title: `Mau Sewa Bot Wa??,  Chat`,
                   body: `Wa Owner:` + setting.owner,
                   thumbnailUrl: pp,
                   sourceUrl: '',
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },*/
                },
            }, { quoted: m })
    } catch (e) {
        throw e
    } finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}
handler.help = ['profile']
handler.tags = ['xp']
handler.command = /^(profile|profil)$/i
export default handler

function dateTime(timestamp) {
	const dateReg = new Date(timestamp)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateReg.toLocaleDateString('id-ID', options);
    return formattedDate
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
    const ye = isNaN(ms) ? '--': Math.floor(ms / 31104000000) % 10
    const mo = isNaN(ms) ? '--': Math.floor(ms / 2592000000) % 12
    const d = isNaN(ms) ? '--': Math.floor(ms / 86400000) % 30
    const h = isNaN(ms) ? '--': Math.floor(ms / 3600000) % 24
    const m = isNaN(ms) ? '--': Math.floor(ms / 60000) % 60
    const s = isNaN(ms) ? '--': Math.floor(ms / 1000) % 60
    return ['┊ ', ye, ' *Years 🗓️*\n', '┊ ', mo, ' *Month 🌙*\n', '┊ ', d, ' *Days ☀️*\n', '┊ ', h, ' *Hours 🕐*\n', '┊ ', m, ' *Minute ⏰*\n', '┊ ', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")
