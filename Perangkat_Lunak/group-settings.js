let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = { 
        'open': 'not_announcement',
        'buka': 'not_announcement',
        'close': 'announcement',
        'tutup': 'announcement',
    }[(args[0] || '')]
    if (isClose === undefined)
        throw `
*Format Salah! Contoh :*
  *${usedPrefix + command} close/tutup* Untuk Tutup Group
  *${usedPrefix + command} open/buka* Untuk Buka Group
`.trim()
    await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['group *buka / tutup*']
handler.tags = ['group']
handler.command = /^(group|gc)$/i

handler.admin = true
handler.botAdmin = true

export default handler
