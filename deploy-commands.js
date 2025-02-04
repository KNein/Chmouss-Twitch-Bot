const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'test',
        description: 'Replies with Test successful!',
    },
    {
        name: 'chmouss',
        description: 'Replies with Chmouss stinks alot!',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORDBOTTOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();