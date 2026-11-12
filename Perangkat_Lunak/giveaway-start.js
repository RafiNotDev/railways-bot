let handler = async (m, { usedPrefix, text, command, participants }) => {
    conn.giveway = conn.giveway ? conn.giveway : {}
    let id = m.chat
    let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	text = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : ''
	if (!text) return rafitampilan(`Penggunaan:\n${usedPrefix + command} GIVEAWAY IPHONE 15 PARAMEX`)
    if (id in conn.giveway) {
     return conn.sendMessage(id, {
    text: `_Masih Ada *GIVEAWAY* Yang Berlangsung digrup ini!_\n_Ketik Tombol Di Bawah Untuk Menghentikan Sesi Giveaway_`,
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
        title: 'STARTUP GIVEAWAY',
        sections: [
          {
            title: `Developer By: @${global.nodev}`,
            highlight_label: '😂',
            rows: [
              {
                header: 'HAPUS SESI GIVEAWAY',
                title: 'Hapus Sesi Giveaway',
                description: 'Menghapus Sesi Giveaway...',
                id: '.deletegiveaway',
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
    let capt = `Berhasil memulai giveaway!\nPencet Tombol Di Bawah Untuk Command Selanjutnya\n\nINFORMASI:*\n\n${text}`
    conn.giveway[id] = [
        conn.sendMessage(id, {
    text: capt,
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
        title: 'STARTUP GIVEAWAY',
        sections: [
          {
            title: `Developer By: @${global.nodev}`,
            highlight_label: '😂',
            rows: [
              {
                header: 'IKUTT BANGGG',
                title: 'Ikut Saya Bang',
                description: 'Ikut Aja Lah Siapa Tau Menang',
                id: '.ikut',
              },
              {
                header: 'CEK GIVEAWAY',
                title: 'Cek Giveaway',
                description: 'Cek Siapa Aja Yang Udah Daftar',
                id: '.cekgiveaway',
              },
              {
                header: 'START PUTARAN GIVEAWAY',
                title: 'Start Putaran Giveaway',
                description: 'Memutar Putaran...',
                id: '.rollgiveaway',
              },
              {
                header: 'HAPUS SESI GIVEAWAY',
                title: 'Hapus Sesi Giveaway',
                description: 'Menghapus Sesi Giveaway...',
                id: '.deletegiveaway',
              },
            ],
          },
        ],
      }),
    },
  },
  ],
  headerType: 1,
  mentions: participants.map(a => a.id),
  viewOnce: true
}, { quoted: m }),
                [],
        text
    ]
}
handler.help = ['mulaigiveaway'].map(v => v + ' <text>')
handler.tags = ['group','owner']
handler.command = /^(start|mulai)giveaway$/i
handler.group = true
handler.admin = true
export default handler