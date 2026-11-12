import fetch from 'node-fetch'
import moment from 'moment-timezone'
let handler = async (m, {
    conn,
    text,
    command,
    usedPrefix
}) => {
    if (!text) return rafitampilan(m.chat, 'gunakan : .iqc kamu gila, dan kamu gila whahhahahahah')
    try {
        await conn.sendMessage(m.chat, {
            react: {
                text: '🕐',
                key: m.key
            }
        })
        let batrai = pickRandom(['10','20','30','40','50','60','70','80','90','100'])
        let waktu = moment.tz('Asia/Jakarta').format('HH:mm')

        let url = `https://brat.siputzx.my.id/iphone-quoted?time=${waktu}&batteryPercentage=${batrai}&carrierName=INDOSAT&messageText=${text}&emojiStyle=apple`

        let res = await fetch(url)
        if (!res.ok) return rafitampilan(m.chat, 'gagal fetch url')

        let buffer = await res.buffer()
        await conn.sendMessage(m.chat, {
            image: buffer
        }, {
            quoted: m
        })
    } finally {
        await conn.sendMessage(m.chat, {
            react: {
                text: '✅',
                key: m.key
            }
        })
    }
}

handler.help = ['iqc *<jam|batre|pesan>* (5 Limit)']
handler.tags = ['tools']
handler.command = ['iqc']
handler.limit = 5
export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}