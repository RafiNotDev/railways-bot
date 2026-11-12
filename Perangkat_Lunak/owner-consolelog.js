/*
 • Fitur By Anomaki Team
 • Created : xyzan code
 • Console LoGs
 • Jangan Hapus Wm
 • https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l

Note : uda pernah ku buat dar awal buat ch, tpi hasil teksnya kurang rapih. Jadi buat agar dikirim jdi file txt
*/

import {
    PassThrough
} from "stream";

const Hai = new PassThrough();
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);

process.stdout.write = (chunk, encoding, callback) => {
    Hai.write(chunk, encoding, callback);
    return originalStdoutWrite(chunk, encoding, callback);
};

process.stderr.write = (chunk, encoding, callback) => {
    Hai.write(chunk, encoding, callback);
    return originalStderrWrite(chunk, encoding, callback);
};

let handler = async (m, {
    conn
}) => {
    let haha = Hai.read()?.toString() || "takda log.";
    let buffer = Buffer.from(haha, "utf-8");

    await conn.sendMessage(m.chat, {
        document: buffer,
        mimetype: "text/plain",
        fileName: "console_log.txt"
    });
};

handler.help = ['consolelog'];
handler.tags = ['owner'];
handler.command = /^consolelog$/i;
handler.rowner = true
export default handler;