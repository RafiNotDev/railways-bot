const handler = async (m, { conn, isGroup }) => {
  const groupId = m.chat;

  for (const userId in global.db.data.users) {
    const userChats = global.db.data.users[userId]?.chats || {};
    if (userChats[groupId]?.chatTotal) delete userChats[groupId].chatTotal;
    if (userChats[groupId]?.chat) delete userChats[groupId].chat;
  }

  // Menghapus properti member dari grup ini saja
  if (global.db.data.chats[groupId]?.member) {
    delete global.db.data.chats[groupId].member;
  }

  await conn.reply(m.chat, "Berhasil menghapus totalchat di grup ini", m);
};

handler.help = ["cleartotalchat"];
handler.tags = ["owner"];
handler.command = ["cleartotalchat", "ctchat"];
handler.group = true;
handler.rowner = true;

export default handler;
