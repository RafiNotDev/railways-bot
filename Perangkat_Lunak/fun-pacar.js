let handler = async (m, { conn, usedPrefix, command, text }) => {
    let user = global.db.data.users
    if (user[m.sender].pacar == "") return m.reply("Kamu tidak memiliki pacar")
    let date = await dateTime(user[m.sender].pacaranTime)
    let thumb = 'https://akcdn.detik.net.id/visual/2016/09/20/34ce7ca9-7652-4631-a37e-459e465d824c_169.jpg?w=400&q=90'
    let caption = `Kamu sudah perpacaran dengan @${user[m.sender].pacar.split("@")[0]} sejak *${date}*`
    conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: {
                mentionedJid: conn.parseMention(caption),
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: setting.idch,
                   serverMessageId: null,
                   newsletterName: setting.namach,
                   },
                   externalAdReply: {
                   title: "Pacar Anda Adalah:",
                   body: `${conn.getName(user[m.sender].pacar + "@s.whatsapp.net")}`,
                   thumbnailUrl: thumb,
                   sourceUrl: setting.website,
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },
                },
            }, { quoted: m })
}
handler.help = ["pacar"]
handler.tags = ["fun"]
handler.command = /^(pacar)$/i
export default handler

function dateTime(timestamp) {
	const dateReg = new Date(timestamp)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateReg.toLocaleDateString('id-ID', options);
    return formattedDate
}