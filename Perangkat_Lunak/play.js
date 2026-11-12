import yts from 'yt-search'
import fetch from "node-fetch"
import axios from "axios"
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `Contoh:\n${usedPrefix + command} chase atlantic`

    try {
    await react(m.chat, "⏰")
    const search = await yts(text)

    if (!search?.videos?.length)
      throw 'Lagu tidak ditemukan'

    let url = search.videos[0].url
    let link = `https://api-faa.my.id/faa/ytmp3?url=${url}`
    let musik = await (await fetch(link)).json()
    let result = musik.result
    let buffer = result.mp3
    await rafimusik(m.chat, buffer, m)
  } finally {
  await react(m.chat, "✅")
  }
}

handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^play$/i
handler.limit = 15

export default handler