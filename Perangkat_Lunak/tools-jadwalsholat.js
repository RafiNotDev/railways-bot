import moment from 'moment-timezone'
import fetch from "node-fetch"
let handler = async ( m, { conn, text, args }) => {

if (!text) return m.reply('Masukan Nama Kota Anda')
let waktu = moment.tz('Asia/Jakarta').format('HH:mm:ss')
let data = await (await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${text}&country=Indonesia&method=5`)).json();
    let jadwalSholat = data.data.timings;
    let hari = data.data.date.readable;
    //Memperbaiki Nama Sholat
    let Subuh = jadwalSholat.Fajr
    let Dzuhur = jadwalSholat.Dhuhr
    let Ashar = jadwalSholat.Asr
    let Maghrib = jadwalSholat.Maghrib
    let Isya = jadwalSholat.Isha
let caption = `
╔═══════════━──⪼
║    JADWAL SHOLAT 
╠═══════════━──⪼
╠⪼ Nama Kota: ${text}
╠═══════════━──⪼
╠⪼ Tanggal: ${hari}
╠⪼ Waktu: ${waktu} WIB
╠═══════════━──⪼
╠⪼ Waktu Subuh: ${Subuh}
╠⪼ Waktu Dzuhur: ${Dzuhur}
╠⪼ Waktu Ashar: ${Ashar}
╠⪼ Waktu Maghrib: ${Maghrib}
╠⪼ Waktu Isya: ${Isya}
╠═══════════━──⪼
╠⪼ Developer: @${global.nodev}
╚═══════════━──⪼`
conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: {
                mentionedJid: conn.parseMention(caption),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: setting.idch,
                   serverMessageId: null,
                   newsletterName: setting.namach,
                   },
                   externalAdReply: {
                   title: "Jadwal Sholat Kota",
                   body: text,
                   thumbnailUrl: 'https://files.catbox.moe/at2m4v.jpg',
                   sourceUrl: setting.website,
                   mediaType: 1,
                   renderLargerThumbnail: false
                   },
                },
            }, { quoted: m })

}
handler.help = ["jadwalsholat"]
handler.command = ["solat","sholat","jadwalsholat"]
handler.tags = ["tools"]
handler.limit = 5
export default handler