import { getContentType, generateWAMessage, generateWAMessageFromContent, generateWAMessageContent,prepareWAMessageMedia, downloadContentFromMessage } from "@adiwajshing/baileys";
let handler = async (m, {conn, args, text, usedPrefix, command}) => {
const settampilan = global.db.data.settings[conn.user.jid].tampilan
const dick = `
┏┃ TYPE TAMPILAN ┃┓
┃╭───────────────┓
┃│⏣ • button
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
text: "type Tampilan saat ini " + settampilan,
      },
 nativeFlowMessage: {
buttons: [         
             {
      "name": "single_select",
      "buttonParamsJson": `{
      "title": "select type",
             "sections":[{
                  "title":"select one of the menu views",
                   "rows":[
                      {"header":"Button","title":"","description":"tampilan menggunakan button","id":".set-tampilan button"},
                      {"header":"Teks","title":"","description":"tampilan menggunakan teks","id":".set-tampilan teks"},
                      {"header":"Gambar","title":"","description":"tampilan menggunakan Gambar","id":".set-tampilan gambar"},
                      {"header":"Adreply","title":"","description":"tampilan menggunakan Adreply","id":".set-tampilan adreply"}
             ]}]}`
       },
     ], },},
}, }, },{ quoted : m })

    if (!text) return conn.relayMessage( msg.key.remoteJid,msg.message,{ messageId: msg.key.id }) 
    if (text === 'button', 'gambar', 'teks', 'adreply') {
    global.db.data.settings[conn.user.jid].tampilan = text;
    m.reply(`Tampilan berhasil di Alihkan Ke ${text}`);
    } else {
    return;
    }
}
handler.help = handler.command = ['set-tampilan']
handler.tags = ['owner']
handler.owner = true
export default handler