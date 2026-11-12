import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    try {
        const nodeModulesPath = path.resolve('node_modules');
        const modules = fs.readdirSync(nodeModulesPath);

        const unusedModules = [];
        modules.forEach(module => {
            // Lakukan pengecekan apakah modul tidak digunakan
            // Anda bisa menambahkan logika pengecekan di sini jika dibutuhkan
            if (module.includes('.bin')) {
                unusedModules.push(module);
            }
        });

        if (unusedModules.length > 0) {
            conn.sendMessage(m.chat, { 
                text: `Modul yang tidak terpakai:\n${unusedModules.join('\n')}`
            });
        } else {
            conn.sendMessage(m.chat, { text: 'Semua modul terpakai dengan baik.' });
        }
    } catch (e) {
        conn.sendMessage(m.chat, { text: `Terjadi kesalahan: ${e.message}` });
    }
};

handler.help = ['cekmodule'];
handler.tags = ['owner'];
handler.command = ['cekmodule'];
handler.rowner = true
export default handler;