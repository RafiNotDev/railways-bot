let handler = async (m, { conn, command, text }) => {
    if (!text) return conn.reply(m.chat, '• *CONTOH :* .testiqnya Bapak Komintod', m)
	
  conn.reply(m.chat, `
   *CEK KECERDASAN*
   

> _Nama Pasien:_ *${text}*

> _Level:_ *${pickRandom(['1%','14%','23%','35%','41%','50%','67%','72%','86%','99%','150%','340%','423%','500%','676%','780%','812%','945%','1000%','Tidak Terbatas!','5000%','7500%','10000%'])}*
`.trim(), m)
}
handler.help = ['testiqnya *<name>*']
handler.tags = ['fun']
handler.command = /^testiqnya/i

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}