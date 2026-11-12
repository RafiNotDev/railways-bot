import axios from "axios"

let handler = async (m, { conn, text, command }) => {
  if (!text || !text.includes("tiktok.com")) return m.reply(`*example:*\n${command} https://vt.tiktok.com/xxx`)

  try {
  await react(m.chat, "⏰")
    let { data } = await axios.get(`https://api.serverweb.qzz.io/download/tiktok-v2?apikey=skyy&url=${encodeURIComponent(text.trim())}`)
    if (!data || !data.result) return m.reply("Gagal mengambil data dari API TikTok.")
    data = data.result

    const info = data.postinfo
    const caption = `*${info.username} (@${info.unique_id})*\n\n${info.media_title || ""}`
    if (data.video_link) {
      const videoUrl = data.video_link || data.hdDownloadUrl || data.downloadUrl
      if ( command == "ttptv") {
      await react(m.chat, "⏰")
     await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption, ptv: true}, { quoted: m })
     await react(m.chat, "✅")
     } else {
      await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption, }, { quoted: m })

      if (data.downloadUrl)
        await conn.sendMessage(m.chat, { audio: { url: data.downloadUrl }, mimetype: "audio/mpeg" }, { quoted: m })
      return
    }
    } else if (Array.isArray(data.items) && data.items.length) {
      const album = data.items.map(img => ({ image: { url: img }, caption }))
      await conn.sendAlbum(m.chat, { albumMessage: album }, m)

      if (data.downloadUrl)
        await conn.sendMessage(m.chat, { audio: { url: data.downloadUrl }, mimetype: "audio/mpeg" }, { quoted: m })
      return
    } else {
    m.reply("Media tidak ditemukan.")
    }
  } catch (err) {
    console.error(err)
    m.reply("Terjadi error saat memproses video TikTok.")
  } finally {
  await react(m.chat, "✅")
  }
}

handler.tags = ["Download"]
handler.help = "tiktok"
handler.command = ["tiktok", "ttdl", "tt", "ttptv"]

export default handler