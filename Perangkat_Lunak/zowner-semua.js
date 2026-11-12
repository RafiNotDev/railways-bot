import { generateWAMessageFromContent } from '@adiwajshing/baileys'
import axios from 'axios'
let handler = async (m, { conn, text, usedPrefix, command, participants, isOwner }) => {
    if (!isOwner) return


try {
    // 1. Unduh gambar asli dari URL menjadi Buffer biner valid
    const response = await axios.get("https://n.uguu.se/LQbepLYY.jpg", { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data);

    // 2. Susun seluruh struktur ke dalam satu variabel objek tunggal
    const pesanMentah = {
        destinasi: m.chat,
        konten: {
            imageMessage: {
                // Trik utama: Tambahkan spesifikasi media agar server WA mau merender gambar
                url: "https://n.uguu.se/LQbepLYY.jpg",
                mimetype: "image/jpeg",
                fileLength: imageBuffer.length,
                jpegThumbnail: imageBuffer,
                
                // Teks deskripsi/statistik ditaruh di dalam caption gambar
                caption: 'https://sairihost.com ─────────────\n' +
                         '[ INFO USER ]\n' +
                         '─────────────\n' +
                         '  Nama    : Fhii\n' +
                         '  Limit   : 9998\n' +
                         '  Energi  : 100\n' +
                         '─────────────\n\n' +
                         '──────────────\n' +
                         '[ STATISTIK USER ]\n' +
                         '──────────────\n' +
                         '  Perintah: 3x\n' +
                         '  Peringatan : 0 point\n' +
                         '  Partner : no\n' +
                         '  Premium : no\n' +
                         '  Banned  : no\n' +
                         '──────────────',
                         
                // ContextInfo dipasang langsung di imageMessage untuk fitur Quote/Reply
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 1,
                    isForwarded: true,
                    quotedMessage: m.message,
                    participant: m.sender,
                    remoteJid: m.chat
                }
            }
        },
        opsi: {
            userJid: conn.user.id,
            quoted: m
        },
        relayOpsi: { 
            messageId: m.id 
        }
    };

    // 3. Generate format protobuf dan kirim pesan menggunakan relayMessage
    const msg = generateWAMessageFromContent(pesanMentah.destinasi, pesanMentah.konten, pesanMentah.opsi);
    await conn.relayMessage(pesanMentah.destinasi, msg.message, pesanMentah.relayOpsi);

} catch (error) {
    console.error("Gagal mengirim banner imageMessage biasa:", error);
}


}
handler.command = ['as']
export default handler