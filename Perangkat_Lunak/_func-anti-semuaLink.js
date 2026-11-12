const TiktokLinkRegex = /tiktok.com/i
const YoutubeLinkRegex = /youtube.com/i
const TelegramLinkRegex = /t.me/i 
const FacebookLinkRegex = /facebook.com/i
const InstagramLinkRegex = /instagram.com/i
const GroupLinkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
const HttpLinkRegex = /http:\/\/([0-9A-Za-z])|https:\/\/([0-9A-Za-z])/i
const WaLinkRegex = /wa.me/i
const ChLinkRegex = /whatsapp.com\/channel/i
export async function before(m, { isAdmin, isBotAdmin, text }) {
    if (m.isBaileys && m.fromMe) return 
    let chat = global.db.data.chats[m.chat]
    let isLinkTiktok = TiktokLinkRegex.exec(m.text)
    let isLinkYt = YoutubeLinkRegex.exec(m.text)
    let isLinkTele = TelegramLinkRegex.exec(m.text)
    let isLinkFb = FacebookLinkRegex.exec(m.text)
    let isLinkIg = InstagramLinkRegex.exec(m.text)
    let isLinkGroup = GroupLinkRegex.exec(m.text)
    let isLinkHttp = HttpLinkRegex.exec(m.text)
    let isLinkWa = WaLinkRegex.exec(m.text)
    let isLinkCh = ChLinkRegex.exec(m.text)
    let userAnti = chat.kick;
        if (chat.antilinkTiktok && m.isGroup) {
           if (isLinkTiktok) {
             if (isAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Admin  Kirim Link Tiktok*\nTapi Peraturan Gak Berlaku Sama Admin Ya Kak', m)
             if (!isBotAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Anda Kirim Link Tiktok*\nTindakan Ini Harus Segera Di Hentikan\nMasalahnya Bot Bukan Admin, Kagak Biasa Bertindak!😔', m)
             if (isBotAdmin) {
if (userAnti === 'kick') {
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Tiktok*\nMaaf Pesan Anda Kami Hapus\nDan Anda Kami Kick${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
    conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Tiktok*\nMaaf Pesan Anda Kami Hapus${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
}}
} else if (chat.antilinkYt && m.isGroup) {
            if (isLinkYt) {
              if (isAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Admin Kirim Link Youtube*\nTapi Peraturan Gak Berlaku Sama Admin Ya Kak', m)
              if (!isBotAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Anda Kirim Link Youtube*\nTindakan Ini Harus Segera Di Hentikan\nMasalahnya Bot Bukan Admin, Kagak Biasa Bertindak!😔', m)
              if (isBotAdmin) {
if (userAnti === 'kick') {
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Youtube*\nMaaf Pesan Anda Kami Hapus\nDan Anda Kami Kick${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
    conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Youtube*\nMaaf Pesan Anda Kami Hapus${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
}}
} else if (chat.antilinkTele && m.isGroup) {
            if (isLinkTele) {
              if (isAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Admin Kirim Link Telegram*\nTapi Peraturan Gak Berlaku Sama Admin Ya Kak', m)
              if (!isBotAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Anda Kirim Link Telegram*\nTindakan Ini Harus Segera Di Hentikan\nMasalahnya Bot Bukan Admin, Kagak Biasa Bertindak!😔', m)
              if (isBotAdmin) {
if (userAnti === 'kick') {
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Telegram*\nMaaf Pesan Anda Kami Hapus\nDan Anda Kami Kick${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
    conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Telegram*\nMaaf Pesan Anda Kami Hapus${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
}}
} else if (chat.antilinkFb && m.isGroup) {
            if (isLinkFb) {
              if (isAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Admin Kirim Link Facebook*\nTapi Peraturan Gak Berlaku Sama Admin Ya Kak', m)
              if (!isBotAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Anda Kirim Link Facebook*\nTindakan Ini Harus Segera Di Hentikan\nMasalahnya Bot Bukan Admin, Kagak Biasa Bertindak!😔', m)
              if (isBotAdmin) {
if (userAnti === 'kick') {
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Facebook*\nMaaf Pesan Anda Kami Hapus\nDan Anda Kami Kick${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
    conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Facebook*\nMaaf Pesan Anda Kami Hapus${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
}}
} else if (chat.antilinkIg && m.isGroup) {
            if (isLinkIg) {
              if (isAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Admin Kirim Link Instagram*\nTapi Peraturan Gak Berlaku Sama Admin Ya Kak', m)
              if (!isBotAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Anda Kirim Link Instagram*\nTindakan Ini Harus Segera Di Hentikan\nMasalahnya Bot Bukan Admin, Kagak Biasa Bertindak!😔', m)
              if (isBotAdmin) {
if (userAnti === 'kick') {
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Instagram*\nMaaf Pesan Anda Kami Hapus\nDan Anda Kami Kick${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
    conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Instagram*\nMaaf Pesan Anda Kami Hapus${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
}}
} else if (chat.antilinkGroup && m.isGroup) {
           if(isBotAdmin) {
            let LinkGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}?mode=gi_t`
            if(m.text.includes(LinkGroup)) return rafitampilan(m.chat, `Terdeteksi @${m.sender.split("@")[0]} Mengirim Link Group Ini\n Bot Kagak Bakal Hapus Link Group Ini`, m)
            }
            if (isLinkGroup) {
              if (isAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Admin Kirim Link Group*\nTapi Peraturan Gak Berlaku Sama Admin Ya Kak', m)
              if (!isBotAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Anda Kirim Link Group*\nTindakan Ini Harus Segera Di Hentikan\nMasalahnya Bot Bukan Admin, Kagak Biasa Bertindak!😔', m)
              if (isBotAdmin) {
if (userAnti === 'kick') {
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Group*\nMaaf Pesan Anda Kami Hapus\nDan Anda Kami Kick${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
    conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Group*\nMaaf Pesan Anda Kami Hapus${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
}}
} else if (chat.antilinkHttp && m.isGroup) {
            if (isLinkHttp) {
              if (isAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Admin Kirim Link Http*\nTapi Peraturan Gak Berlaku Sama Admin Ya Kak', m)
              if (!isBotAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Anda Kirim Link Http*\nTindakan Ini Harus Segera Di Hentikan\nMasalahnya Bot Bukan Admin, Kagak Biasa Bertindak!😔', m)
              if (isBotAdmin) {
if (userAnti === 'kick') {
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Http*\nMaaf Pesan Anda Kami Hapus\nDan Anda Kami Kick${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
    conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Http*\nMaaf Pesan Anda Kami Hapus${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
}}
} else if (chat.antilinkWa && m.isGroup) {
            if (isLinkWa) {
              if (isAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Admin Kirim Link Wa.me*\nTapi Peraturan Gak Berlaku Sama Admin Ya Kak', m)
              if (!isBotAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Anda Kirim Link Wa.me*\nTindakan Ini Harus Segera Di Hentikan\nMasalahnya Bot Bukan Admin, Kagak Biasa Bertindak!😔', m)
              if (isBotAdmin) {
if (userAnti === 'kick') {
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Wa.me*\nMaaf Pesan Anda Kami Hapus\nDan Anda Kami Kick${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
    conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Wa.me*\nMaaf Pesan Anda Kami Hapus${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
}}
} else if (chat.antilinkCh && m.isGroup) {
            if (isLinkCh) {
              if (isAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Admin Kirim Link Channel*\nTapi Peraturan Gak Berlaku Sama Admin Ya Kak', m)
              if (!isBotAdmin) return rafitampilan(m.chat, '[❗] *Terdeteksi Anda Kirim Link Channel*\nTindakan Ini Harus Segera Di Hentikan\nMasalahnya Bot Bukan Admin, Kagak Biasa Bertindak!😔', m)
              if (isBotAdmin) {
if (userAnti === 'kick') {
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Channel*\nMaaf Pesan Anda Kami Hapus\nDan Anda Kami Kick${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
    conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
    rafitampilan(m.chat, `[❗] *Terdeteksi @${m.sender.split("@")[0]} Kirim Link Channel*\nMaaf Pesan Anda Kami Hapus${isBotAdmin ? '.' : ' *Tapi Bot Bukan Admin*'}`, m)
    conn.sendMessage(m.chat, { delete: m.key })
}}
}
return
}