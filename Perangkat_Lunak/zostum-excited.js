let handler = async(m, { conn }) => {
   await conn.sendMessage(m.chat, 
  { video: { url: pickRandom(excited) },
  caption: 'Nih Ngab Videonya',
  footer: `FITUR EXCITED`,
  buttons: [
  {
    buttonId: `.excited`,
    buttonText: {
      displayText: `Lagi Ngab, galau ini`
    },
    type: 1,
  }
  ],
  headerType: 1,
     viewOnce: true
 }, { quoted: m })
}
handler.help = ['excited']
handler.tags = ['info']
handler.command = /^(excited)$/i

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const excited = [
"https://k.top4top.io/m_328297uqx0.mp4",
"https://l.top4top.io/m_3282b62e21.mp4",
"https://a.top4top.io/m_3282lk9412.mp4",
"https://b.top4top.io/m_3282lludg3.mp4",
"https://c.top4top.io/m_3282yaxqp4.mp4",
"https://d.top4top.io/m_32828hos25.mp4",
"https://e.top4top.io/m_3282t4z466.mp4",
"https://f.top4top.io/m_3282i5qmn7.mp4",
"https://g.top4top.io/m_3282cxptn8.mp4",
"https://h.top4top.io/m_328242l5a9.mp4",
"https://d.top4top.io/m_3282j54rp0.mp4",
"https://e.top4top.io/m_3282w5rw01.mp4",
"https://f.top4top.io/m_3282px2e12.mp4",
"https://g.top4top.io/m_3282sdlwm3.mp4",
"https://h.top4top.io/m_32827i3954.mp4",
"https://i.top4top.io/m_3282e5i8f5.mp4",
"https://j.top4top.io/m_3282znzz36.mp4",
"https://k.top4top.io/m_3282l2mib7.mp4",
"https://l.top4top.io/m_3282gnbt98.mp4",
"https://a.top4top.io/m_3282vu7ns9.mp4",
"https://i.top4top.io/m_3282el0ju0.mp4",
"https://j.top4top.io/m_3282hebyv1.mp4",
"https://k.top4top.io/m_32821yget2.mp4",
"https://l.top4top.io/m_3282z12eo3.mp4",
"https://a.top4top.io/m_3282a5coj4.mp4"
]