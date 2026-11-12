let handler = async ( m, { conn, text, groupMetadata, args, isAdmin, isBotAdmin }) => {
if (!m.isGroup) return m.reply("maaf fitur ini hanya untuk group")

if (m.message && m.key && m.key.id) {
try {
await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
    const participantIds = groupMetadata.participants.map((p) => p.jid);

    await conn.sendMessage(m.chat, {
      text: `✅ Grup *${groupMetadata.subject}* telah diperbaiki!\nPeserta: ${participantIds.length} anggota.`,
      mentions: [participantIds],
    });
      await conn.chatModify(
        {
          clear: {
            messages: [{ id: m.key.id, fromMe: false }],
          },
        },
        m.chat
      )
      await conn.sendMessage(
      m.chat,
      { text: "✔️ Fix chat berhasil!" },
      { quoted: m }
    );
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
    } catch (err) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key }})
    m.reply(err)
    } 
    }
}
handler.help = handler.command = ["fixchat"]
handler.tags = ["group"]
handler.admin = true
handler.botAdmin = true
export default handler