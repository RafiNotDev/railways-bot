import fs from 'fs'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    const addnomorowner = JSON.parse(fs.readFileSync("./Storage/Json/rafiowner.json"));
 let nomor = await mention(text)  
switch (command) {
case 'addowner': {
if (m.isBaileys) return
  if (addnomorowner.includes(nomor)) return rafitampilan(m.chat, `Nomor @${nomor.split("@")[0]} sudah terdaftar sebagai owner!`, m)
  if (nomor.split("@")[0] === global.setting.bot) return rafitampilan(m.chat, `Nomor @${nomor.split("@")[0]} adalah nomor bot!`, m)
  if (nomor.split("@")[0] === global.setting.owner) return rafitampilan(m.chat, `Nomor @${nomor.split("@")[0]} adalah owner utama!`, m)
  
  addnomorowner.push(nomor)
  fs.writeFileSync("./Storage/Json/rafiowner.json", JSON.stringify(addnomorowner, null, 2))
  rafitampilan(m.chat, `Nomor @${nomor.split("@")[0]} Sekarang Dah Berhasil Di Tambahkan Ke Dalam Database Owner Bot`, m)

}
break
case 'delowner': {
if (m.isBaileys) return
  if (nomor.split("@")[0] === global.setting.bot) return rafitampilan(m.chat, `Nomor @${nomor.split("@")[0]} adalah nomor bot!`, m)
  if (nomor.split("@")[0] === global.setting.owner) return rafitampilan(m.chat, `Nomor @${nomor.split("@")[0]} adalah owner utama!`, m)
            const unp = addnomorowner.indexOf(nomor);
            if (unp !== -1) {
                addnomorowner.splice(unp, 1);
                fs.writeFileSync('./Storage/Json/rafiowner.json', JSON.stringify(addnomorowner));
                rafitampilan(m.chat, `Nomor @${nomor.split("@")[0]} Sekarang Dah Berhasil Di Hapus Dari Dalam Database Owner Bot`, m)
}
}
break
}
}
handler.help = handler.command = ['addowner','delowner']
handler.tags = ['owner']
handler.rowner = true

export default handler