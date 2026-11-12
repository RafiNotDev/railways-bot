import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

// Ambil waktu di zona Asia/Jakarta
const waktu = moment().tz('Asia/Jakarta');

// Format tanggal dan waktu
const tampilTanggal = waktu.format('dddd, DD MMMM YYYY');
const tampilWaktu = waktu.format('HH:mm:ss');

// Tentukan waktu salam
const tampilHari = waktu.hours() >= 0 && waktu.hours() < 3
  ? 'Selamat Malam'
  : waktu.hours() < 12
  ? 'Selamat Pagi'
  : waktu.hours() < 18
  ? 'Selamat Siang'
  : 'Selamat Sore';

const handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) return m.reply(`[❗] *Format Salah Weh*\nReply Pesannya Trus Ketik\n${usedPrefix + command} Nama Barangnya|Harga Barangnya\n*Contoh:* ${usedPrefix + command} Panel Unli|10.000`)
  let who;
  if (m.isGroup) {
    who = m.quoted ? m.quoted.sender : text;
  } else {
    who = m.chat;
  }
  let batas = text.split('|')
  let [ nama, harga ] = batas
  if (text.length < 2) return m.reply(`[❗] *Format Salah Weh*\nReply Pesannya Trus Ketik\n${usedPrefix + command} Nama Barangnya|Harga Barangnya\n*Contoh:* ${usedPrefix + command} Panel Unli|10.000`)
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (!q) return m.reply('Reply Cok Transaksi Yang Di Amggap Berhasil')
	const pesan = `
╭━━━━━━━━━━━━━━━━━━━╮
┃     *TRANSAKSI BERHASIL*       ┃
┣━━━━━━━━━━━━━━━━━━━╯
┣➥ *Salam:* ${tampilHari}
┣➥ *Tanggal:* ${tampilTanggal}
┣➥ *Jam:* ${tampilWaktu} WIB
┣➥ *Nama Barang:* ${nama}
┣➥ *Harga Barang:* ${harga}
┣➥ *Status:* Berhasil ✅
┣➥ *Powered By:* ${setting.namaowner}
┣━━━━━━━━━━━━━━━━━━━
┣ Pesanan @${who.split('@')[0]} telah berhasil diproses!
╰━━━━━━━━━━━━━━━━━━━╯
  `.trim()
	if (/video/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { video: media, caption: pesan }, { quoted: m })
	} else if (/image/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { image: media, caption: pesan }, { quoted: m })
    } else if (/audio/g.test(mime)) {
		let media = await q.download?.()
		conn.sendMessage(m.chat, { audio: media, mimetype: 'audio/mpeg' }, { quoted: m });
	}
};

handler.help = ['done'];
handler.tags = ['store'];
handler.command = /^(done)$/i;
handler.group = true;
handler.owner = true

export default handler;