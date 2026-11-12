let handler = async (m, { command, text }) => rafitampilan(m.chat, `
*Pertanyaan:* ${command} ${text}
*Jawaban:* ${['Ya', 'Mungkin iya', 'Mungkin', 'Mungkin tidak', 'Tidak', 'Tidak mungkin'].getRandom()}
  `, m)

handler.help = ['apakah <teks>?']
handler.tags = ['fun']
handler.command = /^apakah$/i

export default handler