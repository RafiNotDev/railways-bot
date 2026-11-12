import fs from 'fs'
let handler = async (m, {
	text,
	usedPrefix,
	RafiTampilan,
	command
}) => {
		if (!text) throw `uhm.. teksnya mana?\n\npenggunaan:\n${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} menu`;
		if (command === 'sf' || 'savefile' || 'simpanfile') {
    if (!m.quoted.text) throw `balas pesan nya!`;
    let path = `${text}`;
    await fs.writeFileSync(path, m.quoted.text);
    RafiTampilan(`Nama File Berhasil tersimpan di ${path}`);
  } else if (command === 'df' || 'deletefile' || 'hapusfile') {
    let path = `${text}`;
    if (!fs.existsSync(path)) throw `Nama File ${text} tidak ditemukan`;
    fs.unlinkSync(path);
    RafiTampilan(`Nama File ${text} berhasil dihapus`);
  }
}
handler.tags = ['owner']
handler.help = ['savefile','deletefile']
handler.command = /^(sf|savefile|simpanfile|df|deletefile|hapusfile)$/i
handler.rowner = true

export default handler