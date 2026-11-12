function handler(m, { text }) {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
    m.reply(teks.replace(/[a-z]/gi, v => {
        return {
            'a': 'aga',
            'b': 'baga',
            'c': 'caga',
            'd': 'daga',
            'e': 'ege',
            'f': 'faga',
            'g': 'gaga',
            'h': 'haga',
            'i': 'igi',
            'j': 'jaga',
            'k': 'kaga',
            'l': 'laga',
            'm': 'maga',
            'n': 'naga',
            'o': 'ogo',
            'p': 'paga',
            'q': 'qaga',
            'r': 'raga',
            's': 'saga',
            't': 'taga',
            'u': 'ugu',
            'v': 'vaga',
            'w': 'waga',
            'x': 'xaga',
            'y': 'yaga',
            'z': 'zaga'
        }[v.toLowerCase()] || v
    }))
}
handler.help = ['mars <teks>']
handler.tags = ['fun']
handler.command =  /^(namamars|mars)$/i

export default handler