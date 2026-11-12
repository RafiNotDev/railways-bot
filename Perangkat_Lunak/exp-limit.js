let handler = async (m, { conn, text, isOwner, isAdmin }) => {

let who = await mention(text) 
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
    let user = global.db.data.users[who]
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/itl427.jpg')
    let limit = user.premiumTime >= 1 ? 'Tanpa Batas' : who.split("@")[0] == global.nodev ? 'Tanpa Batas' : who.split("@")[0] == setting.owner ? 'Tanpa Batas' : user.limit
    let tekss = `
   *LIMIT KAMU*
> *Username:* \`@${who.split("@")[0]}\`
> *Status:* \`${who.split("@")[0] == global.nodev ? 'Developer Bot' : who.split("@")[0] == setting.owner ? 'Owner Utama' : isAdmin ? 'Admin Group' : user.premiumTime >= 1 ? 'Premium User' : user.level >= 1000 ? 'Elite User' : 'Free User'}\`
> *Limit:* \`${limit}\`
> *Developer By:* \`@${global.nodev}\``
    await rafitampilan(m.chat, tekss, m)
}
handler.help = ['limit [@user]']
handler.tags = ['xp']
handler.command = /^(limit)$/i
export default handler 