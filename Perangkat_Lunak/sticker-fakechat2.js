import fetch from 'node-fetch'
import { sticker } from '../Perangkat_Keras/Komponen/sticker.js'
import uploadFile from '../Perangkat_Keras/Komponen/uploadFile.js'
let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mediaType || ''
        let txt = text ? text: typeof q.text == 'string' ? q.text: ''
        let name = m.quoted ? m.quoted.name : conn.getName(m.sender)
        let r = m.quoted ? m.quoted.sender : m.sender
        let avatar = await conn.profilePictureUrl(r, 'image').catch(_ => 'https://files.catbox.moe/itl427.jpg')
        avatar = /tele/.test(avatar) ? avatar: await uploadFile((await conn.getFile(avatar)).data)
        let url = `https://api-faa.my.id/faa/qc-black?q=${txt}&username=${name}&avatar=${avatar}`
   let json = await ( await fetch(url)).json()
   let result = json.result.qc_image
   
        if (!/image\/(jpe?g|png|webp)/.test(mime)) {
       if (!json.status) return rafitampilan(m.chat, "Maaf Rest Api Sedang Error", m)
       await jadisticker(result)
    }
}
handler.help = ['qc2'].map(v => v + ' <text & reply>')
handler.tags = ['sticker']
handler.command = /^(qc2|quotely2)$/i

export default handler;