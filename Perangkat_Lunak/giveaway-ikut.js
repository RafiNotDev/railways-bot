let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.giveway = conn.giveway ? conn.giveway : {}
    if (!(id in conn.giveway)) {
     return conn.sendMessage(m.chat, {
    text: `_Tidak ada *GIVEAWAY* berlangsung digrup ini!_\n_Ketik Tombol Di Bawah Untuk Mulai Giveaway_`,
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

    let absen = conn.giveway[id][1]
    const wasVote = absen.includes(m.sender)
    if (wasVote) throw '*Kamu sudah ikut!*'
    absen.push(m.sender)
    m.reply(`*Done!*\n\n\`\`\`Total yang sudah ikut GIVEWAY sebanyak\`\`\`\n*${absen.length} Anggota*`)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
}
handler.help = ['ikutgiveaway']
handler.tags = ['group']
handler.command = /^(ikut|ikutgiveaway)$/i
handler.group = true
export default handler
