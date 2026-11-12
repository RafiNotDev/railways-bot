let handler = async (m, { usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) return conn.sendMessage(id, {
     text: `_*Tidak ada absen berlangsung digrup ini!*_\n\nSuruh Admin Buat Pencet Mulai Absen di Bawah`,
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
                header: 'MULAI ABSEN',
                title: 'Mulai Absen',
                description: 'Memulaikan Absen...',
                id: '.mulaiabsen',
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
    delete conn.absen[id]
    conn.sendMessage(id, {
     text: `Berhasil Menghapus Database Absen`,
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
                header: 'MULAI ABSEN LAGI',
                title: 'Mulai Absen Lagi',
                description: 'Memulaikan Absen...',
                id: '.mulaiabsen',
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
handler.help = ['hapusabsen']
handler.tags = ['group']
handler.command = /^(delete|hapus)absen$/i
handler.group = true
handler.admin = true
export default handler