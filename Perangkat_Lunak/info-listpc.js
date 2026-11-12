import fs from "fs"
let handler = async(m, { conn }) => {
let pc = Object.entries(await conn.chats)
let niorg = pc.filter(([jid]) => jid.endsWith('@s.whatsapp.net'))
let txt = ''
    for (let [jid] of niorg)
txt += `*⫹⫺ Name :* ${await conn.getName(jid)}\n*⫹⫺ Tags :* ${'@' + jid.replace(/@.+/, '')}\n\n`
return conn.sendMessage(m.chat, {text: txt,
  contextInfo: {
      mentionedJid: conn.parseMention(txt),
      externalAdReply: {
      title: `kumpulan chat privasi`,
      body: global.setting.namabot,
      thumbnailUrl: global.setting.tampilan,
      sourceUrl: '',
      mediaType: 1,
      renderLargerThumbnail: false
      }}})
}
handler.help = ['listpc']
handler.tags = ['owner']
handler.command = ['listpc','pclist','daftarpc']
handler.rowner = true

export default handler