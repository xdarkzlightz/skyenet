module.exports = (msg, cBot, skye) => {
    if(msg.author.id === skye.id && msg.channel.id === '') {
        cBot.write(msg.content, (response) => {
            msg.channel.send(response.output)
            console.log(response.output)
        })
    }
}