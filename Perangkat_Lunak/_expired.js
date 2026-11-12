let handler = m => m
handler.before = async function (m) {
    if (m.isGroup && global.db.data.chats[m.chat].expired != 0) {
        if (new Date() * 1 >= global.db.data.chats[m.chat].expired) {
            this.reply(m.chat, `waktu Sewa ${global.setting.namabot} Udah Habis Ya Kakak, Saatnya ${global.setting.namabot} Pergi, kalau Mau Sewa Lagi Hubungi @${global.setting.owner} Ini Nmor Ownerku Ya kakak, Dadah semua👋👋, muach😘`, null).then(() => {
                conn.sendContact(m.chat, setting.owner, m).then(() => {
                    this.groupLeave(m.chat).then(() => {
                        global.db.data.chats[m.chat].expired = 0
                    })
                })
            })
        }
    }
}

export default handler 