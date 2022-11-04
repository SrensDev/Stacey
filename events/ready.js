const client = require('../stacey');

client.on('ready', async (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
})