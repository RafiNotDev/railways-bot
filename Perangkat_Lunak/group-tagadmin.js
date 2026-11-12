let handler = async (m, { conn, participants, groupMetadata }) => {

    const getGroupAdmins = (participants) => {
        let admins = []
        for (let i of participants) {
            i.admin === "admin" ? admins.push(i.jid) : ''
        }
        return admins
    }
    
    const getGroupOwners = (participants) => {
        let Owners = []
        for (let i of participants) {
            i.admin === "superadmin" ? Owners.push(i.jid) : ''
        }
        return Owners
    }

    let pp = "https://files.catbox.moe/itl427.jpg"
    try {
        pp = await conn.profilePictureUrl(m.chat, 'image')
    } catch (e) {
    } finally {
        let { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink } = global.db.data.chats[m.chat]
        const groupAdmins = getGroupAdmins(participants)
        const groupOwners = getGroupOwners(participants)
        let listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.split('@')[0]}`).join('\n')
        let listOwners = groupOwners.map((v, i) => `${i + 1}. @${v.split('@')[0]}`).join('\n')
        let teks = `*「 TAG ADMIN 」*\n

*Name:* 
${groupMetadata.subject}

*Group Owner:* 
${listOwners}

*Group Admins:*
${listAdmin}
`.trim()
        conn.sendMessage(m.chat, {
            text: teks,
            contextInfo: {
                mentionedJid: conn.parseMention(teks),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: setting.idch,
                   serverMessageId: null,
                   newsletterName: setting.namach,
                   },
                   externalAdReply: {
                   title: "Nama Group",
                   body: `${groupMetadata.subject}`,
                   thumbnailUrl: pp,
                   sourceUrl: setting.website,
                   mediaType: 1,
                   renderLargerThumbnail: false
                   },
                },
            }, { quoted: m })
    }
}
handler.help = ['tagadmin']
handler.tags = ['group']
handler.command = /^(tagadmin)$/i

handler.group = true

export default handler