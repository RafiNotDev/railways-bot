let handler = async (m, { conn, participants, usedPrefix }) => {
    let id = m.chat
    conn.giveway = conn.giveway ? conn.giveway : {}
    if (!(id in conn.giveway)) {
  return conn.sendMessage(id, {
    text: `_Tidak ada *GIVEAWAY* berlangsung digrup ini!_\n_Ketik Tombol Di Bawah Untuk Mulai Giveawaynya_`,
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
                header: 'MULAI GIVEAWAY',
                title: 'Mulai Giveaway',
                description: 'Memulaikan Giveaway...',
                id: '.mulaigiveaway',
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
    delete conn.giveway[id]
    conn.sendMessage(m.chat, { text: '*GIVEAWAY* telah selesai', mentions: participants.map(a => a.id) })
}
handler.help = ['hapusgiveaway']
handler.tags = ['group','owner']
handler.command = /^(delete|hapus)giveaway$/i
handler.group = true
handler.admin = true
export default handler