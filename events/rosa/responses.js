let { randomInt } = require('../../util')

module.exports = (msg, counter, i) => {
    let responses = ['asdkjfhaskdjhfka', 'kjasldfja', 'jhfdkgskdfgh', 'qpoiuadpoifja', 
    ';aksdjflaskjdf', 'ily', 'queen', 'ur voice is cute', 'john', '❤']
    
        let send = (msg) => {
            msg.channel.send(responses[randomInt(0, responses.length - 1)])
            i = randomInt()
            counter = 0
          }
    
        counter ===  i ?  send(msg) : counter++
}