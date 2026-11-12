import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    await conn.relayMessage(m.chat, {
      reactionMessage: { 
        key: m.key, 
        text: '⏳' 
      }
    }, { messageId: m.key.id });

    // Fetch the long text JSON file
    const response = await fetch('https://raw.githubusercontent.com/Lanaxdev/hehehe/main/gaktau/longtext.json');
    const data = await response.json();

    // Check if data is available and select a random entry
    if (data && Array.isArray(data) && data.length > 0) {
      // Select a random text from the JSON file
      let randomText = data[Math.floor(Math.random() * data.length)];

      // Send the selected text as a message
      await conn.sendMessage(m.chat, { text: randomText }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { text: 'Failed to retrieve any text. Please try again later.' }, { quoted: m });
    }
  } catch (error) {
    console.error(error);
    await conn.sendMessage(m.chat, { text: 'Error fetching response. Please try again later.' }, { quoted: m });
  } finally {
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})}
};

handler.help = ['longtext'];
handler.tags = ['fun'];
handler.command = /^longtext$/i;
export default handler;