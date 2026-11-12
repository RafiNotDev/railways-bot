import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
    const mainDir = './'; // Mengambil dari direktori saat ini

    // Variabel untuk menyimpan informasi
    let totalFiles = 0;
    let totalFolders = 0;
    let totalSize = 0;

    // Fungsi untuk membaca direktori secara rekursif
    const listFiles = (dir, depth = 0) => {
        let result = '';
        const items = fs.readdirSync(dir);

        items.forEach(item => {
            const itemPath = path.join(dir, item);
            const stats = fs.statSync(itemPath);
            const isDirectory = stats.isDirectory();
            const lastModified = stats.mtime.toLocaleDateString(); // Hanya menampilkan tanggal terakhir diubah

            // Mengecualikan folder tertentu
            if (item === '.npm' || item === 'node_modules' || item === global.sessionName) {
                return; // Lewati folder ini
            }

            const indent = ' '.repeat(depth * 4); // Mengatur indentasi

            if (isDirectory) {
                result += `${indent}📁 ${item.toLowerCase()}\n`; // Menampilkan folder dengan huruf kecil
                totalFolders++; // Menambah total folder
                result += listFiles(itemPath, depth + 1); // Rekursi untuk subfolder
            } else {
                result += `${indent}📄 ${item.toLowerCase()} (diubah: ${lastModified})\n`; // Menampilkan file dengan waktu terakhir diubah
                totalFiles++; // Menambah total file
                totalSize += stats.size; // Menambahkan ukuran file ke total
            }
        });

        return result;
    };

    try {
        // Mengambil hasil dari direktori utama
        let result = '*Daftar file dan folder*\n\n';
        result += listFiles(mainDir); // Mengambil daftar file dan folder

        // Menambahkan informasi total sebelum daftar
        result = `Total folder: ${totalFolders}\n` +
                 `Total file: ${totalFiles}\n` +
                 `Total ukuran: ${(totalSize / (1024 * 1024)).toFixed(2)} MB\n\n` +
                 result; // Menyimpan informasi total sebelum daftar hasil

        // Mengirimkan hasil tanpa batasan panjang
        await conn.sendMessage(m.chat, { text: result }, { quoted: m });
    } catch (error) {
        console.error('Error:', error);
        await conn.sendMessage(m.chat, { text: 'terjadi kesalahan saat mengambil daftar file.' }, { quoted: m });
    }
}

handler.help = ['listfile'];
handler.tags = ['owner'];
handler.rowner = true;
handler.command = /^(listfile)$/i
export default handler