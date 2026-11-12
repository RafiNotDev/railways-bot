import {
	exec
} from 'child_process'

let handler = async (m, {
	conn,
	isROwner,
	text
}) => {
      if (m.isBaileys) return
      try {
			await conn.reply(m.chat, 'Memulai Ulang....', m)
	      } finally {
			restartIndexJs();
			process.exit(0);
			}
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart','mulaiulang']
handler.rowner = true

export default handler

function restartIndexJs() {
	exec('node index.js', (error, stdout, stderr) => {
		if (error) {
			console.error(`Error restarting index.js: ${error}`);
			return;
		}
		console.log('index.js restarted successfully.');
	});
}