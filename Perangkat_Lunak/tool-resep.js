import axios from 'axios'
import cheerio from 'cheerio'
let handler = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    if (!text) return conn.reply(m.chat, `Masukan Format Dengan Benar\n\nContoh: \n${usedPrefix + command} Ayam Geprek\n${usedPrefix + command} https://resepkoki.id/resep/resep-sambal-ijo/`)
    if (/https:\/\/resepkoki.id\/resep/i.test(text)) {
        let res = await detailresep(text)
        let cap = `
▧ *Judul:* ${res.data.judul}
▧ *Waktu Masak:* ${res.data.waktu_masak}
▧ *Hasil:* ${res.data.hasil}
▧ *Tingkat Kesulitan:* ${res.data.tingkat_kesulitan}

▧ *Bahan:* 
${res.data.bahan}

▧ *Langkah Langkah:*
${res.data.langkah_langkah}
`.trim()
        rafitampilan(m.chat, cap, m)
    } else {
        let res = await cariresep(text)
        let cap = res.data.map((v) => {
            return `
❏ *Judul:* ${v.judul}
▧ *Link:* ${v.link}
`.trim()
        }).join('\n\n')
        conn.reply(m.chat, cap, m)
    }
}
handler.help = ['cariresep <query>']
handler.tags = ['search']
handler.command = /^(cariresep|resep)$/i
handler.limit = 5
export default handler

async function cariresep(query) {
    return new Promise(async (resolve, reject) => {
        axios.get('https://resepkoki.id/?s=' + query).then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const link = [];
                const judul = [];
                const upload_date = [];
                const format = [];
                const thumb = [];
                $('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a').each(function(a, b) {
                    link.push($(b).attr('href'))
                })
                $('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a').each(function(c, d) {
                    let jud = $(d).text();
                    judul.push(jud)
                })
                for (let i = 0; i < link.length; i++) {
                    format.push({
                        judul: judul[i],
                        link: link[i]
                    })
                }
                const result = {
                    creator: 'RafiBukanDeveloper',
                    data: format.filter(v => v.link.startsWith('https://resepkoki.id/resep'))
                }
                resolve(result)
            })
            .catch(reject)
    })
}

async function detailresep(query) {
    return new Promise(async (resolve,
        reject) => {
        axios.get(query).then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const abahan = [];
                const atakaran = [];
                const atahap = [];
                $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name').each(function(a, b) {
                    let bh = $(b).text();
                    abahan.push(bh)
                })
                $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount').each(function(c, d) {
                    let uk = $(d).text();
                    atakaran.push(uk)
                })
                $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p').each(function(e, f) {
                    let th = $(f).text();
                    atahap.push(th)
                })
                const judul = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1').text();
                const waktu = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span').text();
                const hasil = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span').text().split(': ')[1]
                const level = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span').text().split(': ')[1]
                const thumb = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img').attr('src')
                let tbahan = 'bahan\n'
                for (let i = 0; i < abahan.length; i++) {
                    tbahan += abahan[i] + ' ' + atakaran[i] + '\n'
                }
                let ttahap = 'tahap\n'
                for (let i = 0; i < atahap.length; i++) {
                    ttahap += atahap[i] + '\n\n'
                }
                const tahap = ttahap
                const bahan = tbahan
                const result = {
                    creator: 'RafiBukanDeveloper',
                    data: {
                        judul: judul,
                        waktu_masak: waktu,
                        hasil: hasil,
                        tingkat_kesulitan: level,
                        thumb: thumb,
                        bahan: bahan.split('bahan\n')[1],
                        langkah_langkah: tahap.split('tahap\n')[1]
                    }
                }
                resolve(result)
            })
            .catch(reject)
    })
}