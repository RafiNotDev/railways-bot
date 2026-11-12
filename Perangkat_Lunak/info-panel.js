import { createHash } from 'crypto'

let handler = async function (m, {
   text,
   usedPrefix,
   command }) {
   
   const data = {
    title: "Klik disini",
    sections: [{
            title: `${setting.namabot} Menyediakan`,
            rows: [{
                    title: "Rp.5.000",
                    description: "RAM 5GB CPU 120%",
                    id: '.payy'
                },
                {
                    title: "Rp.6.000",
                    description: "RAM 6GB CPU 140%",
                    id: '.payy'
                },
                {
                    title: "Rp.7.000",
                    description: "RAM 7GB CPU 160%",
                    id: '.payy'
                },
                {
                    title: "Rp.8.000",
                    description: "RAM 8GB CPU 180%",
                    id: '.payy'
                },
                {
                    title: "Rp.9.000",
                    description: "RAM 9GB CPU 200%",
                    id: '.payy'
                },
                {
                    title: "Rp.10.000",
                    description: "RAM & CPU Unlimited",
                    id: '.payy'
                },
            ]
        },
      ]
     }
await conn.kirimListWoy(m.chat, '📮PANEL PTERODACTYL📮', `\n• Hosting Panel Bulanan\n• Garansi 15 hari\n\n*\`Spesifikasi\`*\n> Tidak Boros Kuota\n> Tidak Boros Penyimpanan\n> Tidak Perlu Ekstrak File\n> Bisa di Tinggal Offline Data\n`, "Klik Tombol untuk memilih", data, m)
};
handler.help = ['Panel']
handler.tags = ['info']
handler.command = /^(panel|buypanel|listpanel)$/i

export default handler