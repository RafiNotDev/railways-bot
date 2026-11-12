/*Script By Rafi Developer
Nomor Developer: 6282286315998
Info Saluran Developer: undefined
Info Package: downloader-tiktok.mjs
*/


/*import axios from 'axios';

let handler = async (m, {
    conn,
    args
}) => {
    if (!args[0]) return m.reply('Mana Link Tiktok Nya')

    let url = args[0];
    if (!url.match(/tiktok\.com/)) return m.reply('Link Mya Yang Valid Lah')

    try {
        await conn.sendMessage(m.chat, {
            react: {
                text: '🕐',
                key: m.key
            }
        })
        let {
            data
        } = await axios.post('https://downloader.bot/api/tiktok/info', {
            url
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/itl427.jpg')
        let result = data.data;
        await conn.sendMessage(m.chat, { 
                video: {url: result.mp4}, 
                caption: result.caption || '',
                viewOnce: true,
                contextInfo: {
mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: global.setting.idch,
      serverMessageId: 103,
      newsletterName: global.setting.namach
    },
    externalAdReply: {
title: `Mau Sewabot??, Chat Owner:`, 
body: setting.owner, 
sourceUrl: "https://wa.me/6282286315998?text=Mau%bot%dong%kak",
thumbnailUrl: pp || setting.tampilan, 
renderLargerThumbnail: false
}, 
}}, { quoted: m })

        await conn.sendMessage(m.chat, { 
                audio: {url: result.mp3}, 
                mimetype: "audio/mpeg",
                ptt: false,
                contextInfo: {
mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: global.setting.idch,
      serverMessageId: 103,
      newsletterName: global.setting.namach
    },
    externalAdReply: {
title: `Mau Sewabot??, Chat Owner:`, 
body: setting.owner, 
sourceUrl: "https://wa.me/6282286315998?text=Mau%bot%dong%kak",
thumbnailUrl: pp || setting.tampilan, 
renderLargerThumbnail: false
}, 
}}, { quoted: m })

    } catch (e) {
        await conn.sendMessage(m.chat, {
            react: {
                text: '❌',
                key: m.key
            }
        })
        m.reply(`${e.message}`);
    } finally {
        await conn.sendMessage(m.chat, {
            react: {
                text: '✅',
                key: m.key
            }
        })
    }
};

handler.help = ['tiktok'];
handler.command = ['tiktok', 'tt', 'ttd'];
handler.tags = ['downloader'];
handler.limit = 5
export default handler;*/