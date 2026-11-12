async function delay(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration * 1000));
}

// Fungsi utama
const clearAllChats = async (conn) => {
  try {
    // Ambil semua JID chat, kalau tidak ada isi dengan array kosong
    const chats = Object.keys(conn.chats || {});

    if (chats.length === 0) {
      console.log("⚠️ Tidak ada chat yang bisa dihapus.");
      return;
    }

    for (const jid of chats) {
      try {
        // 1. Bersihkan isi pesan chat
        await conn.chatModify({ clear: { type: "all" } }, jid);

        await delay(300); // jeda supaya aman dari rate limit

        // 2. Hapus chat dari daftar
        await conn.chatModify({ delete: true }, jid);

        console.log(`✅ Chat ${jid} dibersihkan & dihapus`);
      } catch (err) {
        console.error(`⚠️ Gagal hapus chat ${jid}:`, err.message);
      }
    }

    console.log("🎉 Semua chat sudah dibersihkan!");
  } catch (err) {
    console.error("❌ Gagal membersihkan semua chat:", err.message);
  }
};

let handler = async ( m, { conn }) => {
 await conn.sendMessage(m.chat, {
    text: "⏳ Sedang menghapus semua chat...",
  });
  await clearAllChats(conn);
  await conn.sendMessage(m.chat, {
    text: "✅ Semua chat berhasil dihapus total!",
  });
}
handler.help = handler.command = ['clearchat']
handler.tags = ["group"]
handler.rowner = true
export default handler