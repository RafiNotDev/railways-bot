import axios from 'axios';
import moment from 'moment-timezone'

let handler = async (m, { conn, text, usedPrefix, command }) => {
let name = conn.getName(m.sender)
switch (command) {
case 'pay':
case 'payy':
case 'payment':
case 'donate': {
   try {
   if(payment.qris === "") return conn.sendMessage(m.chat, {
   text: "Pembayaran Qris Tidak Tersedia",
   footer: "Pilih Menu Pembayaran Dibawah",
   buttons: [
    {
      buttonId: '.paypaydana',
      buttonText: {
        displayText: 'DANA'
    }
  },
    {
      buttonId: '.paypayovo',
      buttonText: {
        displayText: 'OVO'
    }
  },
  {
      buttonId: '.paypaygopay',
      buttonText: {
        displayText: 'GOPAY'
      }
    }
  ],
  headerType: 1,
  viewOnce: true,
  }, { quoted: m})
   await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }}) 
   const capp = `▧「 *PEMBAYARAN QRIS* 」\n\nScan Gambar Diatas Kalau Mau Pake Pembayaran Qris\n\n❗Sertakan Screenshot*\n*⚠️Transaksi di Chat Pribadi*\n\nSilahkan Pilih Pembayaran Di Bawah Ini\n Kalau Buat Qris Scan Gambar Di Atas`
   const buttons = [
    {
      buttonId: '.paypaydana',
      buttonText: {
        displayText: 'DANA'
    }
  },
    {
      buttonId: '.paypayovo',
      buttonText: {
        displayText: 'OVO'
    }
  },
  {
      buttonId: '.paypaygopay',
      buttonText: {
        displayText: 'GOPAY'
      }
    }
  ];
const buttonMessage = {
  footer: setting.namabot,
  buttons: buttons,
  headerType: 1,
  viewOnce: true,
       image: { url: payment.qris },
       caption: capp,
    contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: setting.idch,
                newsletterName: setting.namach
            },
            externalAdReply: {
                   title: `Sistem Pembayaran By:`,
                   body: `${setting.namaowner}`,
                   thumbnailUrl: setting.imgface,
                   sourceUrl: 'https://wa.me/6282286315998',
                   mediaType: 5,
                   renderLargerThumbnail: false
                   },
        }
   };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
} finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}
break
case 'paypaydana': {
 try {
  await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
let cap =`▧「 *PEMBAYARAN DANA* 」\n\nNomor: ${global.payment.dana}\n👤A/N : ${global.setting.namaowner}\n\n\n*❗Sertakan Screenshot*\n*⚠️Transaksi di Chat Pribadi*`
await conn.sendMessage(m.chat, {
            text: cap,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                   externalAdReply: {
                   title: `${wish()} Kak ${name}`,
                   body: `Pembayaran Lewat Dana`,
                   thumbnailUrl: "https://telegra.ph/file/c605b34f0d4f0127735b4.jpg",
                   sourceUrl: '',
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },
                },
            }, { quoted: m })
} finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}
break
case 'paypayovo': {
try {
  await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
let cap =`▧「 *PEMBAYARAN OVO* 」\n\nNomor: ${global.payment.ovo}\n👤A/N : ${global.setting.namaowner}\n\n\n*❗Sertakan Screenshot*\n*⚠️Transaksi di Chat Pribadi*`
await conn.sendMessage(m.chat, {
            text: cap,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                   externalAdReply: {
                   title: `${wish()} Kak ${name}`,
                   body: `Pembayaran Lewat Ovo`,
                   thumbnailUrl: "https://telegra.ph/file/a4fa2a32f686d85ff5fa6.jpg",
                   sourceUrl: '',
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },
                },
            }, { quoted: m })
} finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}
break
case 'paypaygopay': {
try {
  await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
let cap =`▧「 *PEMBAYARAN GOPAY* 」\n\nNomor: ${global.payment.gopay}\n👤A/N : ${global.setting.namaowner}\n\n\n*❗Sertakan Screenshot*\n*⚠️Transaksi di Chat Pribadi*`
conn.sendMessage(m.chat, {
            text: cap,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                   externalAdReply: {
                   title: `${wish()} Kak ${name}`,
                   body: `Pembayaran Lewat Gopay`,
                   thumbnailUrl: "https://telegra.ph/file/23a1569461a7833fe2f7e.jpg",
                   sourceUrl: '',
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },
                },
            }, { quoted: m })
} finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}
break
}
}

handler.help = [`payment`]
handler.tags = [`info`]
handler.command = /^(payment|pay|payy|donasi|donate|paypaydana|paypayovo|paypaygopay)$/i
export default handler;

function wish() {
    let wishloc = ''
    const time = moment.tz('Asia/Jakarta').format('HH')
    wishloc = ('Hi')
    if (time >= 0) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 4) {
        wishloc = ('Selamat Pagi')
    }
    if (time >= 11) {
        wishloc = ('Selamat Siang')
    }
    if (time >= 15) {
        wishloc = ('️Selamat Sore')
    }
    if (time >= 18) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 23) {
        wishloc = ('Selamat Malam')
    }
    return wishloc
}