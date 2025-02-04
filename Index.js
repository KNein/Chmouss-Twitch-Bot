const { Client, GatewayIntentBits } = require('discord.js');

require('dotenv').config(); const token = process.env.DISCORDBOTTOKEN;





const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });



client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//respond to messages

client.on('messageCreate', message => {
    if (message.content === '!ping') {
        console.log(`Message received from ${message.author.username}: ${message.content}`);
        message.channel.send('Pong!');
        
    } else if (message.content.toLowerCase() === 'test') {
        console.log(`Message received from ${message.author.username}: ${message.content}`);
        message.channel.send('Test successful!');

    } else if (message.content.toLowerCase() === 'chmouss') {
        console.log(`Message received from ${message.author.username}: ${message.content}`);
        message.channel.send('Chmouss stinks alot!');
    }    
});



//const fetch = require('node-fetch'); 
//twitchLiveMsg();
























const twitchLiveMsg = () => {
const twitchClientId = 'your_twitch_client_id';
const twitchAccessToken = 'your_twitch_access_token';
const twitchUsername = 'Chmouss';

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





client.login(token);