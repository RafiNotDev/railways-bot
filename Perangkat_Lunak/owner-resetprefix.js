let handler = async(m, { conn, text }) => {

  global.prefix = new RegExp('^[' + (opts['prefix'] || text).replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
    await rafitampilan(m.chat,`Prefix berhasil direset ke ${text}`, m)

}
handler.help = ['resetprefix']
handler.tags = ['owner']
handler.command = /^(resetprefix)$/i
handler.rowner = true

export default handler