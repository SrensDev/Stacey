const { Client, Collection, GatewayIntentBits, Partials, ContextMenuCommandAssertions } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        // GatewayIntentBits.GuildBans,
        // GatewayIntentBits.GuildEmojisAndStickers,
        // GatewayIntentBits.GuildIntegrations,
        // GatewayIntentBits.GuildInvites,
        // GatewayIntentBits.GuildMembers,
        // GatewayIntentBits.GuildMessageReactions,
        // GatewayIntentBits.GuildMessageTyping,
        // GatewayIntentBits.GuildPresences,
        // GatewayIntentBits.GuildScheduledEvents,
        // GatewayIntentBits.GuildVoiceStates,
        // GatewayIntentBits.GuildWebhooks,
        // GatewayIntentBits.DirectMessages,
        // GatewayIntentBits.DirectMessageReactions,
        // GatewayIntentBits.DirectMessageTyping
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.Message,
        // Partials.Reaction,
        // Partials.ThreadMember,
        // Partials.GuildMember,
        // Partials.GuildScheduledEvent
    ]
});

module.exports = client;

client.config = require('./config/config.json');
client.commands = new Collection();

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, async (...args) => await event.execute(...args, client));
    }
}

const commandFolders = fs.readdirSync('./legacyCommands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./legacyCommands/${folder}`).filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./legacyCommands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.login(client.config.token);