/*
* Nama fitur : Codeshare Search and detail
* Type : Plugin Esm
* Sumber : https://whatsapp.com/channel/0029Vb6Zs8yEgGfRQWWWp639
* Author : ZenzzXD
*/
import axios from 'axios'
import cheerio from 'cheerio'

async function scrapeCodeShare(query) {
  const url = `https://codeshare.cloudku.click/?q=${encodeURIComponent(query)}`
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  const results = []

  const cards = $('.snippet-card').toArray()

  for (const el of cards) {
    const card = $(el)
    const title = card.find('.card-title a').text().trim()
    const path = card.find('.card-title a').attr('href')
    const link = 'https://codeshare.cloudku.click' + path
    const author = card.find('.card-user .user-info').text().trim()
    const avatar = card.find('.card-user img').attr('src')
    const views = parseInt(card.find('.meta-item').first().text().replace(/\D/g, '')) || 0
    const languageIcon = card.find('.meta-item i').attr('class') || ''
    const language = languageIcon.split('-').pop().replace('plain', '') || 'unknown'

    const rawUrl = link + '&raw=true'
    const raw = await axios.get(rawUrl)
    const fullCode = raw.data

    results.push({
      title,
      link,
      author,
      avatar: avatar ? 'https://codeshare.cloudku.click' + avatar : null,
      views,
      language,
      code: fullCode
    })
  }

  return {
    status: 200,
    total: results.length,
    data: results
  }
}

let handler = async (m, { text, command }) => {
  if (!text) throw `Contoh: .cscsearch Perplexity AI`

  m.reply('wett')

  try {
    const res = await scrapeCodeShare(text)
    if (res.total === 0) return m.reply('gaada nih code yg mau lu cari coba yg lain')

    let teks = res.data.slice(0, 3).map((x, i) => {
      return `Judul : ${x.title}
Author : ${x.author}
Bahasa : ${x.language}
Views : ${x.views}
Link : ${x.link}

Code :
${x.code}`
    }).join('\n\n')

    m.reply(teks)
  } catch (e) {
    m.reply(`Eror kak : ${e.message}`)
  }
}

handler.help = ['carifitur <query>']
handler.tags = ['tools']
handler.command = ['carifitur']

export default handler