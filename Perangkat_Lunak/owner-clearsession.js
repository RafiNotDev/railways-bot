import { tmpdir } from 'os'
import path, { join } from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'
let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
  if (m.isBaileys) return

m.reply('Succes !')
await clearsesi()
}
handler.help = ['clearsession']
handler.tags = ['owner']
handler.command = /^(clearsesi|clearsession)$/i

handler.rowner = true

export default handler

async function clearsesi(folder = `./Cache/SesiBot/${process.env.BOT_ID || 'primary'}`) {
  try {
    const filenames = await readdirSync(folder);
    const deletedFiles = await Promise.all(filenames.map(async (file) => {
      try {
        const filePath = path.join(folder, file);
        const stats = await statSync(filePath);
        if (stats.isFile() && file !== 'creds.json') {
          await unlinkSync(filePath);
          console.log(`Deleted ./Cache/SesiBot/${process.env.BOT_ID || 'primary'}:`.main, filePath.info);
          return filePath;
        }
      } catch (err) {
        console.error(`Gagal Memproses Sesi ${file}: ${err.message}`);
      }
    }));
    return deletedFiles.filter((file) => file !== null);
  } catch (err) {
    console.error(`Gagal Menghapus Sesi: ${err.message}`);
    return [];
  }
}