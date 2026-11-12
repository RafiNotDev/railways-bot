let handler = async (m, { conn, usedPrefix, text }) => {
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

    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.absen[id][1]
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    conn.reply(m.chat, `*「 ABSEN 」*

Tanggal: ${date}
${conn.absen[id][2]}

┌ *Yang sudah absen:*
│ 
│ Total: ${absen.length}
${list}
│ 
└────

_${global.setting.namabot}_`, m, { contextInfo: { mentionedJid: absen } })
}
handler.help = ['cekabsen']
handler.tags = ['group']
handler.command = /^cekabsen$/i
handler.admin = true
handler.group = true 
export default handler
