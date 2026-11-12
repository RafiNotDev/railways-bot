import cp from 'child_process'
import { promisify } from 'util'
let exec = promisify(cp.exec).bind(cp)
let RafiGanteng = async (m, {text, command}) => {
    if (!text) return m.reply('[❗] *Penggunaan Salah*\nContoh: .updatemodule axios\nBuat Update Semua Module Ketik\n.updatemodule all')
	if (text === "all") {
    let o
    try {
    await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
    m.reply('Okeh Owner Kuh Semua Module Yang Ada Di File Package.json Bakal We Update')
        o = await exec('npm update')
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) m.reply(stdout)
        if (stderr.trim()) m.reply(stderr)
        conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
        m.reply('Semua Module Sudah Terupdate Ownerkuh')
    }
    } else {
    let o
    try {
    await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
    m.reply(`Okeh Owner Kuh Module ${text} Bakal We Update`)
        o = await exec(`npm i ${text}`)
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) m.reply(stdout)
        if (stderr.trim()) m.reply(stderr)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
        m.reply(`Module ${text} Sudah Terupdate Ownerkuh`)
    }
    }
}
RafiGanteng.help = ['updatemodule']
RafiGanteng.tags = ['owner']
RafiGanteng.command = /^(updatemodule)$/i
RafiGanteng.rowner = true
export default RafiGanteng
