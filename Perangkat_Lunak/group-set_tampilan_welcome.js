import { getContentType, generateWAMessage, generateWAMessageFromContent, generateWAMessageContent,prepareWAMessageMedia, downloadContentFromMessage } from "@adiwajshing/baileys"

let handler = async (m, {conn, args, text, usedPrefix, command}) => {
const settwelcome = global.db.data.chats[m.chat].tWelcome
const dick = `
┏┃ TYPE WELCOME ┃┓
┃╭───────────────┓
┃│⏣ • teks
┃│⏣ • gambar
┃│⏣ • adreply
┗╰───────────────┛`
let msg = await generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
interactiveMessage: {
body: {
text: dick,            
},
footer: {
text: "type welcome saat ini " + settwelcome,
      },
 nativeFlowMessage: {
buttons: [         
             {
      "name": "single_select",
      "buttonParamsJson": `{
      "title": "Pilihan Tampilan Welcome",
             "sections":[{
                  "title":"Silahkan Pilih Salah Satu Type Tampilan Welcome Di Bawah Ini",
                   "rows":[
                      {"header":"Teks","title":"","description":"tampilan menggunakan teks","id":".set-tampilan-welcome teks"},
                      {"header":"Gambar","title":"","description":"tampilan menggunakan Gambar","id":".set-tampilan-welcome gambar"},
                      {"header":"adreply","title":"","description":"tampilan menggunakan adreply","id":".set-tampilan-welcome adreply"}
             ]}]}`
       },
     ], },},
}, }, },{ quoted : m })

    if (!text) return conn.relayMessage( msg.key.remoteJid,msg.message,{ messageId: msg.key.id }) 
    if (text === 'button', 'gambar', 'teks', 'adreply') {
    global.db.data.chats[m.chat].tWelcome = text;
    m.reply(`welcome berhasil di Alihkan Ke ${text}`);
    } else {
    return;
    }
}
handler.help = handler.command = ['set-tampilan-welcome']
handler.tags = ['group']
handler.admin = true
export default handler