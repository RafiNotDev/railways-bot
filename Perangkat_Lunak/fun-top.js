let handler = async (m, { groupMetadata, command, usedPrefix, text }) => {
    if (!text) throw `Contoh:
    ${usedPrefix + command} pengcoli`
    let user = db.data.users
    let ps = groupMetadata.participants.map(v => v.jid)
    let a = ps.getRandom()
    let b = ps.getRandom()
    let c = ps.getRandom()
    let d = ps.getRandom()
    let e = ps.getRandom()
    let f = ps.getRandom()
    let g = ps.getRandom()
    let h = ps.getRandom()
    let i = ps.getRandom()
    let j = ps.getRandom()
    let k = Math.floor(Math.random() * 70);
    let x = `${pickRandom(['😨', '😅', '😂', '😳', '😎', '🥵', '😱', '🐦', '🙄', '🐤', '🗿', '🐦', '🤨', '🥴', '😐', '👆', '😔', '👀', '👎'])}`
    let l = Math.floor(Math.random() * x.length);
    let top = `*${x} Top 10 ${text} ${x}*

*1. @${a.split('@')[0]} ${x}*
*2. @${b.split('@')[0]} ${x}*
*3. @${c.split('@')[0]} ${x}*
*4. @${d.split('@')[0]} ${x}*
*5. @${e.split('@')[0]} ${x}*
*6. @${f.split('@')[0]} ${x}*
*7. @${g.split('@')[0]} ${x}*
*8. @${h.split('@')[0]} ${x}*
*9. @${i.split('@')[0]} ${x}*
*10. @${j.split('@')[0]} ${x}*
`.trim()
    m.reply(top, false, {
    contextInfo: {
      mentionedJid: [a, b, c, d, e, f, g, h, i, j]
    }
  })
}
handler.help = ['top']
handler.tags = ['fun']
handler.command = /^top$/i
handler.group = true
export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}