let handler = async (m, {
    conn,
    groupMetadata,
    args,
    usedPrefix,
    command
}) => {
    if(!m.quoted) return m.reply(' Lu Reply Pesan Member Yang Bakal Gw Kick Ngab ')
    let user = m.quoted.sender
    let selectedMessage = `Sukses Menjordan @${user.split("@")[0]}, Bye bye Kacung😈`
    try {
    await conn.sendMessage(m.chat, { react: { text: '🦶', key: m.key }})
    conn.groupParticipantsUpdate(m.chat, [user], 'remove')
    conn.reply(m.chat, selectedMessage, m, { mentions: [user] })
    } finally {
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
  }
}
handler.help = ['rkick']
handler.tags = ['group']
handler.command = /^(rkick|replykick|kickreply|rk|kr)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler