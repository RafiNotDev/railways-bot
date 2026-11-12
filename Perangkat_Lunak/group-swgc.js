import { generateWAMessageContent, generateWAMessageFromContent } from "@adiwajshing/baileys";
import crypto from "crypto";

async function groupStatus(sock, jid, content) {
    const inside = await generateWAMessageContent(content, {
        upload: sock.waUploadToServer
    })
    const messageSecret = crypto.randomBytes(32)
    const m = generateWAMessageFromContent(jid, {
        messageContextInfo: {
            messageSecret
        },
        groupStatusMessageV2: {
            message: {
                ...inside,
                messageContextInfo: {
                    messageSecret
                }
            }
        }
    }, {})
    await sock.relayMessage(jid, m.message, {
        messageId: m.key.id
    })
    return m
}

const handler = async (m, {
    conn,
    prefix = ".",
    command
}) => {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";

    const textToParse = m.text || m.body || "";
    const caption = textToParse.replace(
        new RegExp(`^\\${prefix}${command}\\s*`, "i"),
        ""
    ).trim() || m.quoted.text

    const jid = m.chat;

    try {
        if (!mime && !caption) {
            return await m.reply(
                `Reply media atau tambahkan teks.\nContoh: ${prefix}${command} (reply image/video/audio) Hai ini saya`
            );
        }

        let payload = {};

        if (/image/.test(mime)) {
            const buffer = await quoted.download();
            payload = {
                image: buffer,
                caption
            };
        } else if (/video/.test(mime)) {
            const buffer = await quoted.download();
            payload = {
                video: buffer,
                caption
            };
        } else if (/audio/.test(mime)) {
            const buffer = await quoted.download();
            payload = {
                audio: buffer,
                mimetype: "audio/mp4"
            };
        } else if (caption) {
            payload = {
                text: caption
            };
        } else {
            return await m.reply(
                `Reply media atau tambahkan teks.\nContoh: ${prefix}${command} (reply image/video/audio) Hai ini saya`
            );
        }

        await groupStatus(conn, jid, payload);

        await conn.sendMessage(m.chat, {
            react: {
                text: "✅",
                key: m.key
            }
        });
    } catch (err) {
        console.error("❌ Error di .upswgc:", err);
        await m.reply("❌ Terjadi kesalahan saat mengirim status grup.");
    }
};

handler.command = /^(upswgc|swgc|swgrup)$/i;
handler.help = ["swgc"];
handler.tags = ["group"];
handler.owner = true
export default handler;