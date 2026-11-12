
let handler = async (m, { conn }) => {
  try {
    await conn.relayMessage(
      m.chat,
      {
        reactionMessage: {
          key: m.key,
          text: '⏳',
        },
      },
      { messageId: m.key.id }
    );

    // Array cita-citaku dengan banyak pilihan lucu dan becanda
    let citaCita = [
      "menjadi softex agar ku bisa megkokop mem*k😂",
      "menjadi pilot biar bisa terbang ke hatimu",
      "menjadi programmer biar bisa ngoding 24 jam",
      "menjadi artis biar terkenal",
      "menjadi astronot biar bisa ke luar angkasa",
      "menjadi presiden biar bisa bikin negara lebih maju",
      // Kamu bisa menambahkan pilihan lain di sini
      "menjadi penyanyi biar bisa nyanyi di bawah hujan",
      "menjadi koki biar bisa masakin cinta dalam setiap hidangan",
      "menjadi detektif biar bisa cari tahu rahasia kamu",
      "menjadi petani biar bisa panen senyum setiap hari"
    ];

    // Pilih cita-cita secara random
    let randomCita = citaCita[Math.floor(Math.random() * citaCita.length)];

    // Kirim pesan jawaban
    rafitampilan(`Cita-citaku menjadi ${randomCita}`);
  } catch (error) {
    console.error(error);
    await conn.sendMessage(
      m.chat,
      { text: 'Terjadi kesalahan. Coba lagi nanti!' },
      { quoted: m }
    );
  }
};

handler.help = ['cita-citaku (2 Limit)'];
handler.tags = ['fun'];
handler.command = /^cita-citaku$/i;
handler.register = true;
handler.limit = 2
export default handler;

/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (6282389924037)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/