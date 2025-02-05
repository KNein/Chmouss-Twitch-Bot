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
    } else if (commandName === 'twitch') {
        await interaction.reply('https://www.twitch.tv/chmouss');
    } else if (commandName === 'rayz') {
        await interaction.reply({
            content: 'Rayz loves paws',
            files: ['./paws.gif']
        });
    }
});




twitchLiveMsg();


async function twitchLiveMsg() {

    const twitchUsername = process.env.TWITCH_USERNAME;
    let liveNotificationSent = false;


    setInterval(async () => {
        console.log(`Checking ${twitchUsername} Twitch status...`);
        const isLive = await checkTwitchLiveStatus(twitchUsername);
        //console.log('isLive:', isLive);
        if (isLive && !liveNotificationSent) {
            console.log(`${twitchUsername} is now live on Twitch!`);
            const channel = client.channels.cache.find(channel => channel.name === 'awa'); // Change 'general' to the name of the channel you want to send the message to
            if (channel) {
                channel.send(`${twitchUsername} is now live on Twitch!`);
                liveNotificationSent = true;
            }
        } else if (!isLive) {
            liveNotificationSent = false;
            console.log(`${twitchUsername} is not live on Twitch.`);
        }

    }, 60000);
}



async function checkTwitchLiveStatus(twitchUsername) {
    const twitchClientId = process.env.TWITCH_CLIENT_ID;
    const twitchAccessToken = process.env.TWITCH_ACCESS_TOKEN;

    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${twitchUsername}`, {
        headers: {
            'Client-ID': twitchClientId,
            'Authorization': `Bearer ${twitchAccessToken}`
        }
    });
    const data = await response.json();
    //console.log('data:', data.data);
    return data.data.length > 0;
}



