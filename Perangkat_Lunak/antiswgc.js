let handler = m => m
handler.before = async (m, {
    conn,
    isBotAdmin,
    isAdmin,
    isOwner
}) => {
    if (!m.isGroup) return
    let chat = global.db.data.chats[m.chat]
    if (chat.antitagsw) {
        const isTaggingInStatus = (
            m.mtype === 'groupStatusMessageV2'
        )

        if (!isTaggingInStatus) return


        if (isAdmin || isOwner) { // nambahin jika admin maka ha di kick cuma hapus pesan aja
            let warningMessage = `Admin @${m.sender.split("@")[0]} Terdeteksi SwGc Di Group Ini, Tetapi Peraturan Tidak Berlaku Kepada Admin/Owner Bot`

            return rafitampilan(m.chat, warningMessage, m)

        }
        let Pesan = `[❗] *Peringatan*\n@${m.sender.split("@")[0]} Terdeteksi Sw Gc Di Group Ini,\nmohon Untuk Tidak TAG SW Di Group Ini Karena Admin Atau Owner Bot Mengaktifkan Fitur Antitagsw\n\nMaaf Pesannya Kami Hapus${isBotAdmin ? '.' : ' Tapi Bot Bukan Admin Jadi Tidak Bisa Bertindak'}`
        await rafitampilan(m.chat, Pesan, m)
        if (isBotAdmin) {
            await conn.sendMessage(m.chat, {
                delete: m.key
            })
        }
    }
}

export default handler