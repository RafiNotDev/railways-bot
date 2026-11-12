let handler = async (m, { conn }) => {
	
	rafitampilan(m.chat, 'Ya Gapapa Sayang, Jangan Di Ulangin Ya..❤')
	
}


handler.customPrefix = /^(maaf|minta maaf|maaf ya|iya maaf|maap ya|maaf yaa|maaf yaaa|sorry|iam sorry)$/i
handler.command = new RegExp();
export default handler