export const handler = async (m, { conn, command, args }) => {
    const user = db.data.users[m.sender] || {};
    const tag = `@${m.sender.replace(/@.+/, '')}`;

    // Inisialisasi properti default jika belum ada
    user.subscribers = user.subscribers || 0;
    user.like = user.like || 0;
    user.viewers = user.viewers || 0;
    user.money = user.money || 0;
    user.playButton = user.playButton || 0;
    user.lastLiveTime = user.lastLiveTime || 0;

    try {
        if (command === 'ytlive') {
            if (!user.youtube_account) {
                return conn.reply(m.chat, `📢 Hey ${tag},\nKamu belum memiliki akun YouTube!\nGunakan: .createakunyt untuk membuat akun.`, m);
            }

            const title = args.join(' ').trim();
            if (!title || title.length > 50) {
                return conn.reply(m.chat, `${tag}, berikan judul untuk live Anda (maksimal 50 karakter).`, m);
            }

            const cooldownTime = 600000; // 10 menit dalam milidetik
            const lastLiveTime = new Date(user.lastLiveTime);
            const now = new Date();
            const timeSinceLastLive = now - lastLiveTime;

            if (timeSinceLastLive < cooldownTime) {
                const remainingCooldown = cooldownTime - timeSinceLastLive;
                const formattedCooldown = msToTime(remainingCooldown);
                return conn.reply(m.chat, `❌ Kamu baru saja live. Tunggu selama ${formattedCooldown} untuk live kembali.`, m);
            }

            // Simulasi hasil live
            const randomSubscribers = Math.floor(Math.random() * (3000 - 10 + 1)) + 10;
            const randomLike = Math.floor(Math.random() * (1000 - 20 + 1)) + 20;
            const randomViewers = Math.floor(Math.random() * (1000000 - 100 + 1)) + 100;
            const randomDonation = Math.floor(Math.random() * (200000 - 10000 + 1)) + 10000;

            user.subscribers += randomSubscribers;
            user.like += randomLike;
            user.viewers += randomViewers;
            user.money += randomDonation;
            user.lastLiveTime = now;

            // Cek milestone dan hadiah play button
            if (user.subscribers >= 1000000 && user.playButton < 3) {
                user.playButton = 3;
                user.money += 1000000; // Hadiah milestone
                conn.reply(m.chat, `🎉 Selamat! ${tag}\nKamu telah mendapatkan *Diamond PlayButton* dengan hadiah Rp1.000.000!`, m);
            } else if (user.subscribers >= 100000 && user.playButton < 2) {
                user.playButton = 2;
                user.money += 500000;
                conn.reply(m.chat, `🎉 Selamat! ${tag}\nKamu telah mendapatkan *Gold PlayButton* dengan hadiah Rp500.000!`, m);
            } else if (user.subscribers >= 10000 && user.playButton < 1) {
                user.playButton = 1;
                user.money += 250000;
                conn.reply(m.chat, `🎉 Selamat! ${tag}\nKamu telah mendapatkan *Silver PlayButton* dengan hadiah Rp250.000!`, m);
            }

            // Format angka dan mata uang
            const formattedSubscribers = formatNumber(user.subscribers);
            const formattedLike = formatNumber(user.like);
            const formattedViewers = formatNumber(user.viewers);
            const formattedDonation = formatCurrency(randomDonation);

            // Kirim hasil live
            conn.reply(
                m.chat,
                `
📹 *Hasil Live Streaming*

🧑🏻‍💻 *Streamer:* ${tag}
📄 *Judul Live:* ${title}

📈 *Hasil Baru:*
- Subscribers: +${formatNumber(randomSubscribers)}
- Likes: +${formatNumber(randomLike)}
- Viewers: +${formatNumber(randomViewers)}
- Donasi: ${formattedDonation}

📊 *Statistik Total:*
- Total Subscribers: ${formattedSubscribers}
- Total Likes: ${formattedLike}
- Total Viewers: ${formattedViewers}

💡 Cek akun YouTube Anda:
Ketik: .akunyt
                `,
                m
            );
        }
    } catch (err) {
        console.error(err);
        conn.reply(m.chat, `❌ Error: ${err}`, m);
    }
};

// Fungsi untuk mengonversi angka besar menjadi format K, Jt, M, T
const formatNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'M';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'Jt';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
};

// Fungsi untuk mengonversi angka ke format mata uang Indonesia (IDR)
const formatCurrency = (num) => {
    return 'Rp' + new Intl.NumberFormat('id-ID').format(num);
};

// Fungsi untuk mengonversi milidetik menjadi format waktu yang mudah dibaca
const msToTime = (duration) => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const formattedTime = [];
    if (hours > 0) formattedTime.push(`${hours} jam`);
    if (minutes > 0) formattedTime.push(`${minutes} menit`);
    if (seconds > 0 || (hours === 0 && minutes === 0)) formattedTime.push(`${seconds} detik`);

    return formattedTime.join(' ');
};

// Konfigurasi handler
handler.help = ['ytlive'];
handler.tags = ['rpg'];
handler.command = /^(ytlive|ytstreaming)$/i;
handler.register = true;
handler.group = true;

export default handler;