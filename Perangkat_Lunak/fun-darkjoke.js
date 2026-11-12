import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    try {
        await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
        let res = await(await fetch('https://raw.githubusercontent.com/tegarpryd/merlynkurnia/d367f3f359df10c09f35d4b3cb9ec384eafb1b47/fun/darkjoke.json')).json()
        let img = res.getRandom()
        conn.sendFile(m.chat, img.image, null, null, m)
    } catch (e) {
        throw e
    } finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
}
handler.help = ['darkjoke']
handler.tags = ['fun']
handler.command = /^(darkjoke|darkjokes)$/i
handler.register = true
export default handler