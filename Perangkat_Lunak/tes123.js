let handler = async (m, { conn, text}) => {
let anu =`Bot Is Onlineeee.....*`
conn.sendMessage(m.chat, {
  image: { url: global.setting.tampilan },
  caption: anu, 
  footer: `Pencet Tombol Di Bawah Ini`,
  buttons: [
  {
    buttonId: '.allmenu',
    buttonText: {
      displayText: 'Semua Menu'
    },
    type: 1,
  },
  {
    buttonId: '.owner',
    buttonText: {
      displayText: 'Owner Bot'
    },
    type: 1,
  },
  {
    buttonId: '.developer',
    buttonText: {
      displayText: 'Developer Bot'
    },
    type: 1,
  }
  ],
  headerType: 1,
  viewOnce: true
}, { quoted: m });
}
handler.customPrefix = /^(tes|bot|test)$/i
handler.command = new RegExp
export default handler
