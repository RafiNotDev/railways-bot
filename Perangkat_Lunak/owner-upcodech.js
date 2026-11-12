const handler = async ( m, { conn, text, usedPrefix, command }) => {
    
    let q = m.quoted ? m.quoted : m
	let idch = setting.idch
	if (!q) return rafitampilan('Reply Code Yang Bakal Di Upload Ke Saluran')
	if(!idch) return rafitampilan('Maaf Terjadi Error\nMungkin Id Saluran Belum Di Setting\nMohon Setting Dulu Id Salurannya😞')
	if (!text) return rafitampilan(`[❗] *Penggunaan Salah*\nKetik ${usedPrefix + command} Nama Fitur! Sambil Reply Code`)
    try {
    await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
    let caption = `
// ##########################

// Fitur: ${text}.js
// Nama Developer: ${global.namadev}
// Info Saluran: ${setting.linkch}
// Code Di Bawah

// ##########################

${q.text}

// ##########################
// Sekian Dari Saya, Salam Hormat ${global.namadev}
`

    conn.sendMessage(idch, { text: caption 
    }, 
    { quoted: m }
    );
    
    } finally {
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
    rafitampilan(`✅ Sukses mengirim Code ke channel!\nSilahkan Akses Link Berikut:\n${setting.linkch}`)
    }
}

handler.tags = ['owner'];
handler.help = ['upcodech']
handler.command = /^(upcodech|upcdch|codech|cdch)$/i;
handler.rowner = true;

export default handler