let handler = async (m, { conn, text, usedPrefix, command }) => {
  let args = text.split(',').map(a => a.trim());

  if (args.length < 7) {
    return m.reply(`⚠️ *Format Salah!*\n\n📌 *Penggunaan yang benar:*\n${usedPrefix + command} Akun, Log, Spek, Minus, Harga, MC, NoTelp\n\n📌 *Contoh:*\n${usedPrefix + command} FF, Facebook, Mewah, Ga Ada, 60.000, RafiHacker, 62xxx`);
  }

  let [akun, log, spek, minus, harga, mc, notelp] = args;

  const japostMessage = `🌟 *FORMAT JAPOST ${global.setting.namabot}* 🌟  
  *(BUKAN AKUN ADMIN)*  

📌 *Detail Akun:*  
➤ *AKUN:* ${akun}  
➤ *LOG:* ${log}  
➤ *SPEK:* ${spek}  
➤ *MINUS:* ${minus}  
➤ *OP/HARGA:* ${harga}  
➤ *MC:* ${mc}  
➤ *NO LU:* ${notelp}  

⚠️ *CATATAN:*  
💠 **Wajib menggunakan jasa admin ${global.setting.namaowner}** agar terhindar dari *clone/penipuan*!  
💠 Kami tidak bertanggung jawab atas transaksi di luar admin resmi.  

🔹 *Terima kasih telah mempercayai layanan kami!* 🤝  
${global.setting.namabot}`

    let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/video/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { video: media, caption: japostMessage }, { quoted: m })
	} else if (/image/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { image: media, caption: japostMessage }, { quoted: m })
    } else if (/audio/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { audio: media, mimetype: 'audio/mpeg' }, { quoted: m });
  } else {
    // Jika tanpa gambar, bot hanya mengirim teks
    m.reply(japostMessage);
  }
}

handler.help = ['jasapost'];
handler.tags = ['store'];
handler.command = ["jasapost", "jp"];

export default handler
