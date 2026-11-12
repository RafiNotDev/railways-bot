let handler = async (m, {conn, args, usedPrefix, command}) => {
        
        const selected = args[0]?.toLowerCase();
  if (!['on', 'off'].includes(selected)) {
    return m.reply(`*Penggunaan :*\n.adminonly on\n.adminonly off`);
  }
  let chat = global.db.data.chats[m.chat];
  chat.adminonly = selected;
  
  if (selected === 'on') {
  return m.reply(`[❗] *PERINGATAN* \nBot Memasuki Mode Admin Only Di group Ini\nSemua Member Gak Bisa Akses Fitur Bot Ini\nCuman Admin Dan Developer Bot Doang Yang Bisa Akses`);
  }
  if (selected === 'off') {
  return m.reply(`[❗] *PERINGATAN* \nBot Tidak Memasuki Mode Admin Only Di Group Ini\n Semua Member Bisa Akses Fitur Bot, Jangan Spam Bot yaa guys, Ketahuan Aku Ewe Entar`)
  }
}
handler.help = handler.command = ['adminonly']
handler.tags = ['group']
handler.admin = true
export default handler