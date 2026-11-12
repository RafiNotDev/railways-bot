import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `uhm.. teksnya mana?\n\npenggunaan:\n${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} menu`;

  if (command === 'sft') {
    if (!m.quoted.text) throw `balas pesan nya!`;
    let path = `Perangkat_Lunak/${text}.js`;
    await fs.writeFileSync(path, m.quoted.text);
    rafitampilan(`File Package tersimpan di ${path}`);
  } else if (command === 'dft') {
    let path = `Perangkat_Lunak/${text}.js`;
    if (!fs.existsSync(path)) throw `File Package ${text}.js tidak ditemukan`;
    fs.unlinkSync(path);
    rafitampilan(`File Package ${text}.js berhasil dihapus`);
  }
};

handler.help = ['sft', 'dft'].map(v => v + ' <teks>');
handler.tags = ['owner'];
handler.command = /^(sft|dft)$/i;
handler.rowner = true

export default handler