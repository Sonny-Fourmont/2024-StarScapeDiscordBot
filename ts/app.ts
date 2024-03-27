import 'dotenv/config';
import { Client } from 'discord.js';

// import commandsBuider + commands
import commandsBuilder from "./commandsBuilder";
import apod from './commands/apod';
import facts from './commands/facts';
import jarjar from './commands/jarjar';
import newletter from './commands/newletter';
import ping from './commands/ping';

// Format date of the day
const date = new Date();
export const formattedDate = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;

// init discord client
const client = new Client({
    intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent']
});

// init bot first command
client.on('ready', (c) => {
    commandsBuilder;
    console.log(`${c.user.username} is online.`);
});

// discord bot interactions
client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

    ping(interaction);
    apod(interaction);
    facts(interaction);
    jarjar(interaction);
    newletter(interaction);
});

// discord bot login
client.login(process.env.DISCORD_TOKEN);