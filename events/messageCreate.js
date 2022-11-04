const { Client, Message } = require('discord.js');
const client = require('../stacey');

const escapeRegex = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

client.on('messageCreate', async (message) => {
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {import('discord.js').Message & { client: import('../typings').Client}}
     */
    const { client, guild, channel, content, author } = message;

    const checkPrefix = client.config.prefix.toLowerCase();

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`);

    if (!prefixRegex.test(content.toLowerCase())) return;

    const [ matchedPrefix ] = content.toLowerCase().match(prefixRegex);

    const args = content.slice(matchedPrefix.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    if (!message.content.startsWith(matchedPrefix) || message.author.bot) return;

    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command) {
        // Code
    }

    try {
        command.execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.channel.send({ embeds: [{ description: 'An error occurred!' }] })
    }
})