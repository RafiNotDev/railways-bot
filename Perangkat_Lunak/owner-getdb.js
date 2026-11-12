import fs from 'fs'
let handler = async (m, { conn, text }) => {
   if (m.isBaileys) return
    rafitampilan('Tunggu Sebentar, Sedang mengambil file Database')
    let sesi = await fs.readFileSync('./Cache/DataBot.json')
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'rafibotdata.json' }, { quoted: m })
}
handler.help = ['getdb']
handler.tags = ['owner']
handler.command = /^(getdb)$/i

handler.rowner = true

export default handler