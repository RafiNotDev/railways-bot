let handler = async (m, { conn, command, text }) => {
    if (!text) return conn.reply(m.chat, '• *CONTOH :* .cekwibunya Bapak Komintod', m)
	
  conn.reply(m.chat, `
   *CEK KEWIBUAN*
   

> _Nama Pasien:_ *${text}*

> _Level:_ *${pickRandom(['4% Masih Aman Lah Yaa!','7% Masih Aman','12% Aman Kok','22% Hampir Aman','27% Wibu dikit','35% Wibu ¼','41% Dah lewat dri Aman','48% Setengah Wibu','56% Lu Wibu juga','64% Lumayan Wibu','71% Pasti Lu Punya Seribu Waifu','1% 99% LU GAK Wibu!','77% Gak akan Salah Lagi dah Wibunya lu','83% Dijamin Sepuhnya Wibu','89% Fix Wibu Elite!','94% Udah Elite Sih Ini😂','100% BAU BAWANGNYA SAMPE SINI CUY!!!'])}*
`.trim(), m, m.mentionedJid ? { mentions: m.mentionedJid } : {})
}
handler.help = ['cekwibunya *<name>*']
handler.tags = ['fun']
handler.command = /^cekwibunya/i

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}