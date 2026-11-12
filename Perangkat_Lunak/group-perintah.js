let handler = async (m, {
    conn,
    text,
    args,
    isAdmin,
    isOwner,
    isBotAdmin,
    israfiowner,
    command,
    usedPrefix
}) => {

    switch (command) {
        case "perintah-tutup":
        case "perintah-close": {
            if (!isBotAdmin) return m.reply('Maaf Kalo Gunakan Fitur Ini Bot Harus Jadi Admin Dulu Bhangsat')

            if (!( isAdmin || isOwner || israfiowner )) return m.reply('Maaf Perintah Ini Hanya Untuk Admin, Buat Member Bhangsat kagak Bisa')

            await conn.groupSettingUpdate(m.chat, 'announcement');
            m.reply(`[ ❗ ] _*GROUP TERTUTUP*_\nAlasan: ${text ? `${text}` : 'Tanpa Alasan'}\nPerintah Oleh: ${m.pushName}`)
        }
        break
        case "perintah-buka":
        case "perintah-open": {
            if (!isBotAdmin) return m.reply('Maaf Kalo Gunakan Fitur Ini Bot Harus Jadi Admin Dulu Bhangsat')

            if (!( isAdmin || isOwner || israfiowner )) return m.reply('Maaf Perintah Ini Hanya Untuk Admin, Buat Member Bhangsat kagak Bisa')

            await conn.groupSettingUpdate(m.chat, 'not_announcement');
            m.reply(`[ ❗ ] _*GROUP TERBUKA*_\nPerintah Oleh: ${m.pushName}`)
        }
    }
}
handler.help = ['perintah-tutup', 'perintah-buka']
handler.tags = ['group']
handler.command = ["perintah-tutup", "perintah-close", "perintah-buka", "perintah-open"]
export default handler