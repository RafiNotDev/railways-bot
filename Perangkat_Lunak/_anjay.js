import fs from 'fs'
let handler = async (m, { conn, usedPrefix, command }) => {
    let owner = `${pickRandom(['https://files.catbox.moe/n23gox.mp3', 'https://files.catbox.moe/nyh87z.mp3'])}`
            await conn.sendPresenceUpdate('recording', m.chat)
           rafimusik(m.chat, owner, m)
}
handler.customPrefix = /^(anjay|anjayy|wanjay|wanjayy|enjay|enjayy|)$/i
handler.command = new RegExp
export default handler 

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}