import axios from 'axios';
let handler = async (m, { conn }) => {
    const ipUrl = 'https://ipinfo.io/json';
    try {
        const res = await axios.get(ipUrl);
        let locationInfo = res.data;

        let response = `📍 *Lokasi Bot:*\n\n`;
        response += `🌍 Negara: ${locationInfo.country}\n`;
        response += `🏙 Kota: ${locationInfo.city}\n`;
        response += `💻 ISP: ${locationInfo.org}\n`;
        response += `📍 Koordinat: ${locationInfo.loc}\n`;
        response += `🕒 Zona Waktu: ${locationInfo.timezone}\n\n`;
        response += `_Lokasi ini berdasarkan data IP server bot._`;

        await conn.sendMessage(m.chat, { text: response });
    } catch (error) {
        await conn.sendMessage(m.chat, { text: '❌ Tidak dapat mendeteksi lokasi bot. Coba lagi nanti.' });
    }
};
handler.help = ['cekipbot'];
handler.command = ['cekipbot','apibot','botapi'];
handler.tags = ['owner','tools'];
handler.owner = true
export default handler;