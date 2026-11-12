const __filename = import.meta.filename;
import * as baileys from '@adiwajshing/baileys';
const loadBaileys = async () => baileys;
let WAMessageStubType = null

import urlRegexSafe from 'url-regex-safe';
const urlRegex = urlRegexSafe({ strict: false });
import PhoneNumber from 'awesome-phonenumber';
let terminalImage = null;
import chalk from 'chalk';
import fs from 'fs';

export default async function (m, conn = { user: {} }) {
if (m.isGroup) {
let jaid = await (await Promise.all(
    (m.msg?.contextInfo?.mentionedJid || []).map(async jid => ({
        original: jid,
        converted: await conn.getJidAsync?.(jid)
    }))
))
console.log(`
┌────────── [ ${setting.namabot} ] ──────────┐
│
│ 🕒 Waktu      : ${chalk.green(new Date().toISOString().slice(0, 19).replace('T', ' '))}
│
│ 📝 Pesan: ${chalk.bold.white(m.text)}
│
│ 👤 Pengirim: ${chalk.magenta(m.pushName)} ~ ${chalk.cyan(m.sender)}
│
│ 🏠 Group: ${chalk.yellow(await conn.getName(m.chat))} ~ ${chalk.cyan(m.chat)}
│
│ 📝 Type Pesan: ${chalk.magenta(m.mtype)}
│
└────────────────────────────────────────┘
    `.trim());

if ( m.msg?.contextInfo?.mentionedJid ) {
console.log('MENTION:', m.msg?.contextInfo?.mentionedJid)
console.log('MAPPING:', await Promise.all(
    (m.msg?.contextInfo?.mentionedJid || []).map(async jid => ({
        original: jid,
        converted: await conn.getJidAsync?.(jid)
    }))
))
} else {
return
}

} else {
    console.log(`
┌───────── [ ${setting.namabot} ] ─────────┐
│
│ 🕒 Waktu: ${chalk.green(new Date().toISOString().slice(0, 19).replace('T', ' '))}
│
│ 📝 Pesan: ${chalk.blue(m.text)}
│
│ 👤 Pengirim: ${chalk.magenta(m.pushName)} ~ ${chalk.cyan(m.sender)}
│
│ 📝 Type Pesan: ${chalk.magenta(m.mtype)}
└────────────────────────────────────────┘
    `.trim());
}
}
import { pathToFileURL } from 'url';
let file = import.meta.filename;
fs.watchFile(file, async () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'lib/print.js'"));
  if (global.reloadHandler) console.log(await global.reloadHandler())
});
