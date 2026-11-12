let handler = async (m, { conn, participants, groupMetadata }) => {
    const { isBanned, welcome, pembatasan, sWelcome, sBye, sPromote, isDetect, sDemote, antiLinkkick, antiLinkdelete, antiFoto, antiVideo, antiAudio, antiPolling, antiBadword, antiLinkWa, viewonce, nsfw, rpg, game, delete: del } = global.db.data.chats[m.chat]
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
    let text = `*ID:* 
${groupMetadata.id}
*Name:* 
${groupMetadata.subject}
*Description:* 
${groupMetadata.desc?.toString() || 'unknown'}
*Total Members:*
${participants.length} Members
*Group Owner:* 
@${owner.split('@')[0]}
*Group Admins:*
${listAdmin}
*Group Settings:*
${isBanned ? '✅' : '❌'} Banned
${isDetect ? '✅' : '❌'} Detect
${welcome ? '✅' : '❌'} Welcome
${pembatasan ? '✅' : '❌'} Restrict
${del ? '❌' : '✅'} Anti Delete
${antiFoto ? '✅' : '❌'} Anti Foto
${antiVideo ? '✅' : '❌'} Anti Video
${antiAudio ? '✅' : '❌'} Anti audio
${antiPolling ? '✅' : '❌'} Anti Polling
${antiBadword ? '✅' : '❌'} Anti BadWord
${viewonce ? '✅' : '❌'} Anti ViewOnce
${nsfw ? '✅' : '❌'} Nsfw
${rpg ? '✅' : '❌'} Rpg Game
${game ? '✅' : '❌'} Game
*Message Settings:*
Welcome: ${sWelcome}
Bye: ${sBye}
Promote: ${sPromote}
Demote: ${sDemote}
`.trim()
    await conn.sendFile(m.chat, fotopp(m.chat), null, text, m, null, { mentions: conn.parseMention(text) })
}

handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i

handler.group = true

export default handler