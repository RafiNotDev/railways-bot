import pkg from '@adiwajshing/baileys';

const { proto, generateWAMessageFromContent } = pkg;
const handler = async (m, { conn, usedPrefix, command, groupMetadata }) => {
    let msgs = db.data.chats[m.chat].listStr;
    let msg = (Object.entries(msgs).map(([nama, isi]) => ({ nama, ...isi }))).map(v => v.nama);
    
    if (!msg.length) {
        throw `\nBelum Ada List Yang Ditambahkan Admin\nketik *${usedPrefix}addlist <nama_list>* untuk menambahkan daftar menu.\n`;
    }
    
    const data = {
        title: "Daftar List Store",
        sections: [
            {
                title: "📌 List Store yang tersedia",
                rows: msg.map(v => ({ title: v, description: "Klik untuk memilih", id: v }))
            }
        ]
    };

    let buttonMessage = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: '乂 Akses List Dengan Cara Pilih List:'
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: global.footer
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: 'Daftar List Store',
                        subtitle: "Klik untuk memilih",
                        hasMediaAttachment: false
                    }),
                    contextInfo: {
                        forwardingScore: 9999,
                        isForwarded: false,
                        mentionedJid: conn.parseMention(m.sender)
                    },
                    externalAdReply: {
                        showAdAttribution: true,
                        renderLargerThumbnail: false,
                        mediaType: 1
                    },
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            "name": "single_select",
                            "buttonParamsJson": JSON.stringify(data)
                        }]
                    })
                })
            }
        }
    }, {});

    conn.relayMessage(m.chat, buttonMessage.message, {});
};

handler.help = ['store'].map(v => 'list' + v);
handler.tags = ['group', 'store'];
handler.command = /^list(store|shop)?$/i;
handler.group = true;

export default handler;