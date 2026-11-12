import didyoumean from 'didyoumean';
import similarity from 'similarity';

let handler = m => m;

handler.before = function (m, { match, usedPrefix }) {
  if ((usedPrefix = (match[0] || '')[0])) {
    let noPrefix = m.text.replace(usedPrefix, '').trim();
    let alias = Object.values(global.Tools).filter(v => v.help && !v.disabled).map(v => v.help).flat(1);
    let mean = didyoumean(noPrefix, alias);
    let sim = similarity(noPrefix, mean);
    let similarityPercentage = parseInt(sim * 100);      

    if (mean && noPrefix.toLowerCase() !== mean.toLowerCase()) {
      let response = `• ᴀᴘᴀᴋᴀʜ ᴋᴀᴍᴜ ᴍᴇɴᴄᴀʀɪ fitur ʙᴇʀɪᴋᴜᴛ ɪɴɪ?\n\n◦ ɴᴀᴍᴀ ᴄᴏᴍᴍᴀɴᴅ: ➠ *${usedPrefix + mean}*\n◦ ʜᴀsɪʟ ᴋᴇᴍɪʀɪᴘᴀɴ: ➠ *${similarityPercentage}%*`;

 conn.sendMessage(m.chat, {
  text: response,
  footer: "Klik Tombol Di Bawah Ini",
  interactiveButtons: [
  { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: `${mean.toUpperCase()}`, id: `${usedPrefix + mean}` }) },
    { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'CHAT OWNER', url: `https://wa.me/${setting.owner}` }) },
    { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'CHAT DEVELOPER', url: `https://wa.me/${global.nodev}` }) }
  ], contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                },
               })
      
    }
  }
}

export default handler;