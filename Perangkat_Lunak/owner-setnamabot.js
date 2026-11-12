let handler = async ( m, { conn, text, args, usedPrefix, command }) => {
        
        if (!text) return rafitampilan(`Mohon Masukan Nama Yang Akan Di Ubah Untuk Bot\nContoh: ${usedPrefix + command} ${setting.namaowner}`)
        try {
          await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
            conn.updateProfileName(text)
            } finally {
            rafitampilan('Berhasil Mengubah Nama Profil Menjadi: ' + text)
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
            }
}
handler.help = ['setnamabot']
handler.tags = ['owner']
handler.command =  /^(setnamabot|setnamebot|setbotnama|setbotname)$/i
handler.owner = true

export default handler 