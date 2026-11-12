import moment from "moment-timezone";
let handler = async (m, { conn, usedPrefix, command, text }) => {
    let target = await mention(text)
    if (!target) return m.reply(`Reply atau tag orangnya! \n\nContoh : \n${usedPrefix + command} @${m.sender.split("@")[0]}`, false, { mentions: [m.sender] })
    if (target == m.sender) return m.reply("Tidak bisa kick diri sendiri")
    if (target.split("@")[0] === global.setting.owner) return m.reply(`Lu Ngapa mpruy, Ini Owner Gw Ngapain Lu kick`)
    await m.reply(`✨🎩 Selamat Datang Di Pertunjukan Sulap ${hari()} Ini! 🎩✨`)
    await delay(2000)
    await m.reply("🔮 Hari Ini, kita Akan Melakukan Sesuatu Yang Luar Biasa... 🔮")
    await delay(2000)
    await m.reply("🧙‍♂️ Siapkan Diri Kalian... Perhatikan Dengan Seksama... 🧙‍♂️")
    await delay(2000)
    await m.reply("✨ Sim Salabim... Menghilangkan yang tak terduga... ✨")
    await delay(2000)
    await m.reply("🎩 Abracadabra... Lihatlah... Sesuatu yang menakjubkan akan terjadi... 🎩")
    await delay(2000)
    await m.reply("🪄 Hocus Pocus... Siap untuk menghilangkan seseorang... 🪄")
    await delay(2000)
    await m.reply("✨ Siap-siap... Semua akan hilang dalam sekejap... ✨")
    await delay(2000)
    await m.reply("🌟 *Dan...!* 🌟")
    await delay(1000)
    await m.reply("💥 *Poof!* Anggota ini menghilang dari grup... 💥")
    await delay(2000)
 
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
    await m.reply(`Sukses mengeluarkan @${target.split("@")[0]} dari group! 🧙‍♂️✨`, false, { mentions: [target] })
}
 
handler.help = ['sulap']
handler.tags = ['group']
handler.command = /^(sulap|dor|duar)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler

function hari() {
  const time = moment.tz("Asia/Jakarta").format("HH");
  let res = "Selamat Menjelang Pagi";
  if (time >= 4) {
    res = "Pagi";
  }
  if (time >= 10) {
    res = "Siang";
  }
  if (time >= 15) {
    res = "Sore";
  }
  if (time >= 18) {
    res = "Malam";
  }
  return res;
}

let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))