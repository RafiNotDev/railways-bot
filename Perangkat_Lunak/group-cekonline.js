let handler = async (m, { conn }) => {

    try {
    await conn.sendMessage(m.chat, { react: { text: '🔎', key: m.key }})
        const groupMetadata = await conn.groupMetadata(m.chat)
        const participants = groupMetadata.participants || []
        
        if (participants.length === 0) {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key }})
            return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> Tidak bisa mendapatkan data member grup`)
        }
        
        await m.reply(`🔍 *ᴍᴇɴᴄᴀʀɪ ᴍᴇᴍʙᴇʀ ᴏɴʟɪɴᴇ...*\n\n> Menunggu response dari ${participants.length} member\n> Estimasi: 5-10 detik`)
        
        const presences = {}
        
        const presenceHandler = (update) => {
            if (update.id === m.chat && update.presences) {
                for (const [jid, presence] of Object.entries(update.presences)) {
                    if (presence.lastKnownPresence === 'available' || 
                        presence.lastKnownPresence === 'composing' || 
                        presence.lastKnownPresence === 'recording') {
                        presences[jid] = presence.lastKnownPresence
                    }
                }
            }
        }
        
        conn.ev.on('presence.update', presenceHandler)
        
        const batchSize = 10
        for (let i = 0; i < participants.length; i += batchSize) {
            const batch = participants.slice(i, i + batchSize)
            await Promise.all(batch.map(p => 
                conn.presenceSubscribe(p.id).catch(() => {})
            ))
            await new Promise(resolve => setTimeout(resolve, 500))
        }
        
        await new Promise(resolve => setTimeout(resolve, 5000))
        
        conn.ev.off('presence.update', presenceHandler)
        
        const onlineMembers = Object.keys(presences)
        const mentions = onlineMembers
        
        let text = `📊 *ᴄᴇᴋ ᴏɴʟɪɴᴇ*\n\n`
        text += `╭┈┈⬡「 📋 *ɪɴꜰᴏ ɢʀᴜᴘ* 」\n`
        text += `┃ 👥 ɴᴀᴍᴀ: *${groupMetadata.subject}*\n`
        text += `┃ 👤 ᴛᴏᴛᴀʟ: \`${participants.length}\` member\n`
        text += `┃ 🟢 ᴏɴʟɪɴᴇ: \`${onlineMembers.length}\` member\n`
        text += `╰┈┈⬡\n\n`
        
        if (onlineMembers.length === 0) {
            text += `> _Tidak ada member yang terdeteksi online_\n`
            text += `> _Pastikan member telah membuka WA_`
        } else {
            text += `╭┈┈⬡「 🟢 *ᴍᴇᴍʙᴇʀ ᴏɴʟɪɴᴇ* 」\n`
            
            let count = 0
            for (const jid of onlineMembers) {
                if (count >= 50) {
                    text += `┃ ... dan ${onlineMembers.length - 50} member lainnya\n`
                    break
                }
                const number = jid.split("@")[0]
                const participant = participants.find(p => p.id === jid)
                const isAdmin = participant?.admin === 'admin' || participant?.admin === 'superadmin'
                const adminBadge = isAdmin ? ' 👑' : ''
                
                let statusIcon = '🟢'
                if (presences[jid] === 'composing') statusIcon = '⌨️'
                if (presences[jid] === 'recording') statusIcon = '🎤'
                
                text += `┃ ${statusIcon} @${number}${adminBadge}\n`
                count++
            }
            
            text += `╰┈┈⬡\n\n`
            text += `> 🟢 Online | ⌨️ Mengetik | 🎤 Rekam Audio`
        }
        
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
        m.reply(text)
        
    } catch (error) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key }})
        m.reply(`❌ *ᴇʀʀᴏʀ*\n\n> ${error.message}`)
    }
}
handler.help = handler.command = ['cekonline']
handler.tags = ['group']

export default handler