let rosaCleverbot = require('./rosa/cleverbot')
let rosaResponses = require('./rosa/responses')

module.exports = (msg, { cBot, skyeBot, rosaBot }, { counter, i }) => {
    rosaCleverbot(msg, cBot, skyeBot.user)
}