let { Client } = require('discord.js')
let Cleverbot = require('cleverbot-node')
// let sq = require('sqlite3')
let { EventEmitter } = require('events')
require('dotenv').config()

let messageEvent = require('./events/messageEvent')
let { randomInt } = require('./util')


let rosa = new Client()
let skye = new Client()
let ready = new EventEmitter()
let cleverbot = new Cleverbot;

// const db = new sq.Database('./db.sqlite3').th
cleverbot.configure({botapi: process.env.CLEVERBOT_API});


let status = {
 rosa: false,
 skye: false
}

let handleReady = () => status.rosa && status.skye ? ready.emit('ready') : false

rosa.on('ready', () => {
    status.rosa = true
    handleReady()
})
skye.on('ready', () => {
    status.skye = true
    handleReady()
})


ready.on('ready', async () => {
    rosa.user.setPresence({ activity: { name: 'with Skye' }})
    console.log('Fake rosa online. God im such a slime')
    skye.user.setPresence({ activity: { name: 'with Rosa' }})
    console.log('Fake Skye online. Ready to eat candles')

    let rosaGuild = await rosa.guilds.fetch(process.env.GUILD_ID)
    let rosaChannel = rosaGuild.channels.resolve(process.env.CHANNEL_ID)
    let skyeGuild = await skye.guilds.fetch(process.env.GUILD_ID)
    let skyeChannel = skyeGuild.channels.resolve(process.env.CHANNEL_ID)

    let turn = 0
    let timeout
    let response = 'goodmorning'

    let handleTimeout = () => 
        cleverbot.write(response, (res) => {
            if(turn) {
                rosaChannel.send(res.output)
                turn = 0
            } else {
                skyeChannel.send(res.output)
                turn = 1
            }
            response = res.output
            timeout = setTimeout(handleTimeout, 1000*60*5)
        })

    rosaChannel.send(response)
    timeout = setTimeout(handleTimeout, 1000*60*5)
})

let counter = 0
let i = randomInt()
// rosa.on('message', msg => messageEvent(msg, { rosa, skye, cleverbot}, { counter, i }))

rosa.login(process.env.ROSA_TOKEN)
skye.login(process.env.SKYE_TOKEN)