let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.giveway = conn.giveway ? conn.giveway : {}
    if (!(id in conn.giveway)) {
     return conn.sendMessage(id, {
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
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.giveway[id][1]
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    conn.reply(m.chat, `*「 LIST MEMBER 」*

Tanggal: ${date}
${conn.giveway[id][2]}

┌ *Yang sudah ikut:*
│ 
│ Total: ${absen.length}
${list}
│ 
└────

_${global.wm}_`, m, { contextInfo: { mentionedJid: absen } })
}
handler.help = ['cekgiveaway']
handler.tags = ['group','owner']
handler.command = /^cekgiveaway$/i
handler.admin = true
export default handler
