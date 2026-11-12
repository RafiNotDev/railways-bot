/* PLUGINS DECRYPT FILE ENC
     BY RAFI HACKER
   NOTE:
       1. LU HARUS TAMBAHIN DULU MODULE WEBCRACK KE DALAM package.json
       "webcrack":"^latest"
        nih lu salin trus lu paste kan ke dalam package.json
        terus restart di panel
       2. Jangan lu hapus wm gw yaaa
*/
import { webcrack } from 'webcrack'
import fs from 'fs'

let handler = async (m, { usedPrefix, text, args, command }) => {
 try {
 await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
const usage = `Kalo Kek Gitu Salah Tolol:
${usedPrefix + command} (Masukin Teksnya Kontol, Yang Bakal Gw Bobol )
${usedPrefix + command} doc (Reply Code Javascript Yang Berbentuk Document)`;

if (args.length >= 1) {
text = args.join(" ");
} else if (m.quoted && m.quoted.text) {
text = m.quoted.text;
} else {
return m.reply(usage);
}

try {
let message;
if (text === 'doc' && m.quoted && m.quoted.mtype === 'documentMessage') {
let docBuffer;
if (m.quoted.mimetype) {
docBuffer = await m.quoted.download();
}
message = await webcrack(docBuffer.toString('utf-8'));
} else {
message = await webcrack(text);
}

const filePath = `./Cache/Sampah/${getRandom(".js")}`
fs.writeFileSync(filePath, message.code);

await conn.sendMessage(m.chat, {
document: {
url: filePath
},
mimetype: 'application/javascript',
fileName: 'Decrypt_by_Rafi_Hacker.js'
}, {quoted: m});

conn.reply(`${global.nodev}@s.whatsapp.net`, "Ada yang Make Fitur Decrypt Developer", m)

} catch (error) {
const errorMessage = `There is an error: ${error.message}`;
await m.reply(errorMessage);
}
} finally {
 conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})}
}
handler.help = ['decrypt']
handler.tags = ['tools']
handler.command = /^(decrypt|dec)$/i
handler.owner = false
export default handler