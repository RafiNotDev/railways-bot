let handler = async (m, { conn, command, text }) => {
    if (!text) return conn.reply(m.chat, '• *CONTOH :* .cektololnya Bapak Komintod', m)
	
  conn.reply(m.chat, `
   *CEK KETOLOLAN*
   

> _Nama Pasien:_ *${text}*

> _Level:_ *${pickRandom(['4% AMAN BANGET!','7% Masih Aman','12% Aman Kok','22% Hampir Aman','27% Tolol dikit','35% Tolol ¼','41% Dah lewat dri Aman','48% Setengah Tolol','56% Lu Tolol juga','64% Lumayan Tolol','71% Hebatnya ketololan lu','1% 99% LU GAK TOLOL!','77% Gak akan Salah Lagi dah tololnya lu','83% Dijamin tololnyan','89% Tolol Banget!','94% Setolol Om Deddy😂','100% LU ORANG TERTOLOL YANG PERNAH ADA!!!','100% LU ORANG TERTOLOL YANG PERNAH ADA!!!','100% LU ORANG TERTOLOL YANG PERNAH ADA!!!','100% LU ORANG TERTOLOL YANG PERNAH ADA!!!'])}*
`.trim(), m, m.mentionedJid ? { mentions: m.mentionedJid } : {})
}
handler.help = ['cektololnya *<name>*']
handler.tags = ['fun']
handler.command = /^cektololnya/i

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}