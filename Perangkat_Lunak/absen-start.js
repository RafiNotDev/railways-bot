let handler = async (m, { usedPrefix, text, conn }) => {
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    let teks1 = `_*Masih ada absen di chat ini!*_\n\nKetik .hapusabsen untuk Menghapus sesi Absen Yang Berlangsung`
    let teks2 = `*Berhasil memulai absen*!\n\nKetik .absen : Untuk Absen\nKetik .cekabsen : Untuk Cek Absen\nKetik .hapusabsen : Untuk Hapus Sesi Absen Yang Berlangsung`
   let userAbsen = global.db.data.chats[m.chat].tampilan
    if (id in conn.absen) {
    if (userAbsen === 'gambar') {
    return conn.sendMessage(m.chat, {
            text: teks1,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                   externalAdReply: {
                   title: `Mau Sewa Bot Wa??,  Chat`,
                   body: `Wa Owner:` + setting.owner,
                   thumbnailUrl: fotopp(m.sender) || setting.tampilan,
                   sourceUrl: '',
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },
                },
            }, { quoted: m })
}
if (userAbsen === 'teks') {
    return conn.sendMessage(id, {
        text: teks1
        }, { quoted: m })
}
    return conn.sendMessage(id, {
     text: `_*Masih ada absen di chat ini!*_\n\nKetik Hapus Absen Di bawah Buat Hapus Absen Yang Lama`,
     footer: global.setting.namabot,
     buttons: [
  {
    buttonId: 'action',
    buttonText: {
      displayText: 'ini pesan interactiveMeta'
    },
    type: 4,
    nativeFlowInfo: {
      name: 'single_select',
      paramsJson: JSON.stringify({
        title: 'STARTUP ABSEN',
        sections: [
          {
            title: `Developer By: @${global.nodev}`,
            highlight_label: '😂',
            rows: [
              {
                header: 'HAPUS ABSEN',
                title: 'Hapus Absen',
                description: 'Menghapus Absen...',
                id: '.hapusabsen',
              },
            ],
          },
        ],
      }),
    },
  },
  ],
  headerType: 1,
  viewOnce: true
}, { quoted: m })

}
    conn.absen[id] = [
       conn.sendMessage(m.chat, {
     text: `*Berhasil memulai absen*!\n\nKetik Tombol Di Bawah Untuk Selanjutnya`,
     footer: global.setting.namabot,
     buttons: [
  {
    buttonId: 'action',
    buttonText: {
      displayText: 'ini pesan interactiveMeta'
    },
    type: 4,
    nativeFlowInfo: {
      name: 'single_select',
      paramsJson: JSON.stringify({
        title: 'STARTUP ABSEN',
        sections: [
          {
            title: `Developer Bot: ${namadev}`,
            highlight_label: 'Recomended',
            rows: [
              {
                header: 'ABSEN',
                title: 'Absen',
                description: 'Absensi',
                id: '.absen',
              },
              {
                header: 'CEK ABSEN',
                title: 'Cek Absen',
                description: 'Mengecek Absen',
                id: '.cekabsen',
              },
              {
                header: 'HAPUS ABSEN',
                title: 'Hapus Absen',
                description: 'Menghapus Absen',
                id: '.hapusabsen',
              },
            ],
          },
        ],
      }),
    },
  },
  ],
  headerType: 1,
  viewOnce: true
}, { quoted: m }),
         [],
        text
    ]
}
handler.help = ['mulaiabsen'].map(v => v + ' <text>')
handler.tags = ['group']
handler.command = /^(start|mulai)absen$/i
handler.group = true
handler.admin = true
export default handler