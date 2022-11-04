const { Client, Message } = require('discord.js');
const client = require('../../stacey');

module.exports = {
    name: 'ping',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     * @param {import('../../typings').LegacyCommand}
     */
    
    async execute(client, message, args) {
        message.channel.send({ content: `${client.ws.ping} ms`  });
    }
}