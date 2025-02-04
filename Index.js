const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildIntegrations] });
client.login(process.env.DISCORDBOTTOKEN);


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'test') {
        await interaction.reply('Test successful!');
    } else if (commandName === 'chmouss') {
        await interaction.reply('Chmouss stinks alot!');
    }
});




//twitchLiveMsg();

function twitchLiveMsg () {
    const twitchClientId = process.env.TWITCH_CLIENT_ID;
    const twitchAccessToken = process.env.TWITCH_ACCESS_TOKEN;
    const twitchUsername = process.env.TWITCHUSERNAME;

    async function checkTwitchLiveStatus() {
        const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${twitchUsername}`, {
            headers: {
                'Client-ID': twitchClientId,
                'Authorization': `Bearer ${twitchAccessToken}`
            }
        });
        const data = await response.json();
        return data.data.length > 0;
    }

    setInterval(async () => {
        const isLive = await checkTwitchLiveStatus();
        if (isLive) {
            const channel = client.channels.cache.find(channel => channel.name === 'general'); // Change 'general' to the name of the channel you want to send the message to
            if (channel) {
                channel.send(`${twitchUsername} is now live on Twitch!`);
            }
        }
    }, 60000);
};



