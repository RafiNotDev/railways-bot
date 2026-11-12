let handler = m => m

handler.all = async function (m) {
this.ev.on('virus', async (virus) => {
    // auto clear ketika terdapat pesan yang tidak dapat dilihat di wa desktop
    if (virus[0].status == 'offer' && global.db.data.settings[this.user.jid].virus) {
    if (m.messageStubType === 68) {
        let log = {
            key: m.key,
            content: m.msg,
            sender: m.sender
        }
        await this.modifyChat(virus[0].from, 'clear', {
            includeStarred: false
        })
        await this.updateBlockStatus(virus[0].from, "block").catch(console.log)
    }
}
})
 return !0;
}
export default handler 