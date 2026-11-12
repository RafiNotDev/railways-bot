import cron from 'node-cron';
import moment from 'moment-timezone';

let birthdayList = []; // Daftar ulang tahun
let autoBirthdayEnabled = false; // Status auto ulang tahun

// Fungsi untuk menambahkan ulang tahun
function addBirthday(date, message) {
    birthdayList.push({ date, message });
}

// Fungsi untuk menghapus ulang tahun
function deleteBirthday(message) {
    birthdayList = birthdayList.filter(b => b.message !== message);
}

// Fungsi untuk menjadwalkan auto ulang tahun
function scheduleAutoBirthday(conn, chatId) {
    // Hentikan task lama jika ada
    stopAutoBirthday();

    // Jadwalkan cron setiap pukul 00:00
    const task = cron.schedule(
        '0 0 * * *', // Pukul 00:00 setiap hari
        () => {
            if (!autoBirthdayEnabled) return;

            const today = moment().tz('Asia/Jakarta').format('DD/MM'); // Tanggal hari ini (tanpa tahun)
            const birthdaysToday = birthdayList.filter(b => b.date.startsWith(today)); // Filter ulang tahun hari ini

            // Kirim ucapan ulang tahun
            birthdaysToday.forEach(({ message }) => {
                conn.sendMessage(chatId, { text: `🎉 *Selamat Ulang Tahun!* 🎉\n\n${message}` });
            });
        },
        { timezone: 'Asia/Jakarta' }
    );

    return task;
}

let birthdayTask; // Menyimpan task auto ulang tahun

// Fungsi untuk menghentikan auto ulang tahun
function stopAutoBirthday() {
    if (birthdayTask) {
        birthdayTask.stop();
        birthdayTask = null;
    }
}

// Command handler
let handler = async (m, { conn, text, command }) => {
    const args = text.split('|');
    switch (command) {
        case 'addultah': {
            const [date, message] = args.map(v => v.trim());
            if (!date || !message) return m.reply('Format: .addultah dd/mm/yyyy|pesan')

            addBirthday(date, message);
            m.reply(`🎂 Ulang tahun berhasil ditambahkan:\n- Tanggal: ${date}\n- Pesan: ${message}`);
            break;
        }

        case 'delultah': {
            const message = args[0]?.trim();
            if (!message) return m.reply('Format: .delultah pesan');

            deleteBirthday(message);
            m.reply(`🎂 Ulang tahun dengan pesan "${message}" berhasil dihapus.`);
            break;
        }

        case 'cekultah': {
            if (birthdayList.length === 0) {
                m.reply('🎂 Tidak ada daftar ulang tahun.');
                return;
            }

            const list = birthdayList.map(({ date, message }, i) => `${i + 1}. ${date} - ${message}`).join('\n');
            m.reply(`🎂 Daftar Ulang Tahun:\n\n${list}`);
            break;
        }

        case 'autoultah': {
            const status = text.trim().toLowerCase();

            if (status === 'on') {
                autoBirthdayEnabled = true;
                birthdayTask = scheduleAutoBirthday(conn, m.chat);
                m.reply('🎂 Auto ulang tahun diaktifkan. Pengingat akan dikirim otomatis setiap pukul 00:00.');
            } else if (status === 'off') {
                autoBirthdayEnabled = false;
                stopAutoBirthday();
                m.reply('🎂 Auto ulang tahun dimatikan. Tidak ada pengingat ulang tahun otomatis.');
            } else {
                m.reply('Format: .autoultah on/off');
            }
            break;
        }

        default:
            m.reply('Perintah tidak valid.');
    }
};

handler.help = ['addultah', 'delultah', 'cekultah', 'autoultah'];
handler.tags = ['owner'];
handler.command = /^(addultah|delultah|cekultah|autoultah)$/i;
handler.group = true
handler.owner = true

export default handler;