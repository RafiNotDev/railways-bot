import uploadImage from '../Perangkat_Keras/Komponen/uploadImage.js'
import uploadFile from '../Perangkat_Keras/Komponen/uploadFile.js'
import axios from "axios"

export async function before(m, {
    conn
}) {
    let chat = db.data.chats[m.chat]
    if (m.isBaileys && m.fromMe) return true;
    if (!m.isGroup) return false

    const {
        mtype,
        text,
        sender
    } = m
    let hapus = m.key.participant
    let bang = m.key.id

    if (chat.antiPorn) {
        if (mtype === 'imageMessage' || mtype === 'videoMessage' || mtype === 'stickerMessage') {
            //code
            const media = await m.download()

            let up
            if (mtype === 'imageMessage' || mtype === 'videoMessage') {
                up = await uploadImage(media)
            } else if (mtype === 'stickerMessage') {
                up = await uploadFile(media)
            }
            const {
                nsfw,
                msg
            } = await antiNsfw(up)
            if (nsfw > 0.35) {

                return conn.sendMessage(m.chat, {
                    text: `❗${msg}`
                }, {
                    quoted: m,
                    mentions: m.sender
                }).then(_ => {
                    conn.sendMessage(m.chat, {
                        delete: {
                            remoteJid: m.chat,
                            fromMe: false,
                            id: bang,
                            participant: hapus
                        }
                    })
                })

            } else {
                console.log('media aman')
            }
        }
    }
}

async function antiNsfw(url) {
    try {
        let response = await axios.get('https://api.sightengine.com/1.0/check.json', {
            params: {
                'url': url,
                'models': 'nudity-2.1',
                'api_user': '665733371',
                'api_secret': 'BH6tJbcqzfwUZpVF9TmdQRyNgfYY8tFq',
            }
        })

        if (response.data.status == 'success') {
            const message = `Konten NSFW *( ${response.data.nudity.sexual_activity}% )* terdeteksi oleh sistem, media mengandung NSFW.`

            return {
                nsfw: response.data.nudity.sexual_activity,
                msg: message
            }
        }
    } catch (e) {
        console.log('terjadi error saat mendeteksi media: ' + e)
    }
}