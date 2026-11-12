let handler = async (m, { text, args }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : args[1] ? args[1] : false
    else who = m.chat 
    if (!who) throw 'tag/reply orang nya'

    const sizes = ['30A', '32B', '32C', '32D', '34A', '34B', '34C', '36A', '36B', '36C', '38A', '38B', '38C', '40A', '40B', '40C', '42A', '42B', '42C', '42D'];
    const colors = ['Merah', 'Biru', 'Hijau', 'Kuning', 'Hitam', 'Putih', 'Oranye', 'Ungu', 'Coklat', 'Abu-abu', 'Merah Muda', 'Biru Muda', 'Hijau Muda', 'Krem', 'Biru Tua', 'Hijau Tua', 'Biru Langit', 'Toska', 'Salmon', 'Emas', 'Perak', 'Magenta', 'Cyan', 'Olive', 'Navy'];
    const shapes = ['Boxer', 'Brief', 'Trunk', 'Thong', 'Jockstrap', 'Bikini', 'Hipster', 'Tanga', 'G-string', 'T-brief', 'Mini Boxer', 'Shorty', 'Midi', 'Maxi', 'Slip', 'High-leg', 'Cheeky', 'Brazilian', 'Cutaway', 'Sport Brief'];

    const randomSize = await getRandomItem(sizes);
    const randomColor = await getRandomItem(colors);
    const randomShape = await getRandomItem(shapes);

   await conn.reply(m.chat, `Bra si @${who.split('@')[0]} adalah:\nUkuran: ${randomSize}\nWarna: ${randomColor}\nBentuk: ${randomShape}`, m);
};

handler.help = handler.command = ["cekbh"];
handler.tags = ["fun"];
export default handler;

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}