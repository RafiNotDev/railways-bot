let handler = async (m, { conn, command }) => {
    let wm = global.wm
    let _uptime = process.uptime() * 1000
    let uptimex = clockString(_uptime)

    let tio = `
    INFO MODE
╔══════════━──⪼
╠─⪼ *Mode:* \`${global.opts['self'] ? 'Self' : 'publik'}\`
╠─⪼ *Aktif:* \`${uptimex}\`
╠─⪼ *Pengguna:* \`${Object.keys(global.db.data.users).length}\`
╠─⪼ *Pengguna Terbanned:* \`${Object.entries(global.db.data.users).filter(user => user[1].banned).length}\`
╠─⪼ *Fitur Sering Digunakan:* \`${Object.entries(db.data.stats).length}\`
║
╚══════════━──⪼
\`Jika bot tidak ada balasan maka bot sedang maintenance.\``.trim()
conn.sendMessage(m.chat, {
text: tio,
contextInfo: {
externalAdReply: {
title: '',
body: '',
thumbnailUrl: global.setting.tampilan,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: false
}}})
}
handler.help = ['mode']
handler.tags = ['info']
handler.command = /^(mode|runtime)$/i 
handler.owner = true

export default handler

function clockString(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " Hari " + hours + " Jam " + minutes + " Menit " + sec + " Detik";
}