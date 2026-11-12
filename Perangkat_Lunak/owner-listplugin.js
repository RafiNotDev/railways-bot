import fs from "fs";
import path from "path";

let handler = async (m, { isOwner, __dirname }) => {
    try {
        if (!isOwner) {
            return m.reply("❌ Anda tidak memiliki izin untuk menggunakan perintah ini.");
        }

        let files = fs.readdirSync(__dirname).filter(file => file.endsWith(".js"));

        if (files.length === 0) {
            return m.reply("📂 Tidak ada file Tools yang tersedia di folder *Package*.");
        }

        let listPackage = files.map((file, index) => `${index + 1}. 📌 *${file}*`).join("\n");
        return m.reply(`🔍 *Daftar Package yang Tersedia:*\n\n${listPackage}`);
    } catch (err) {
        console.error("Error saat membaca daftar Package:", err);
        return m.reply("❌ Terjadi kesalahan saat membaca daftar Package.");
    }
};

handler.help = ["listpackage"].map(cmd => `${cmd} *Menampilkan daftar Package yang tersedia*`);
handler.tags = ["owner"];
handler.command = ["listpackage", "listpackage", "listpckg"];
handler.rowner = true
export default handler;