import 'dotenv/config';
import { Client, Interaction } from 'discord.js';

// import commandsBuider + commands
import commandsBuilder from "./commandsBuilder";
import apod from './commands/apod';
import facts from './commands/facts';
import jarjar from './commands/jarjar';
import newletter from './commands/newletter';
import ping from './commands/ping';

// Format date of the day
const date: Date = new Date();
function getFormattedDate () {
    let fullDate: string;
    let year: number = date.getFullYear();
    let month: number = date.getMonth() + 1;
    let day: number = date.getDate();

    fullDate = `${year}-`;
    if (month < 10)
        fullDate += `0${month}-`;
    else
        fullDate += `${month}-`;

    if (day < 10)
        fullDate += `0${day}`;
    else
        fullDate += `${day}`;
    return (fullDate);
};
export const formattedDate: string = getFormattedDate();
console.log(formattedDate);

// init discord client
const client: Client = new Client({
    intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent']
});

// init bot first command
client.on('ready', (client: Client<true>) => {
    commandsBuilder;
    console.log(`${client.user.username} is online.`);
});

client.on("messageCreate", async (message) => {
})

// discord bot interactions
client.on("interactionCreate", async (interaction: Interaction) => {
	if (!interaction.isCommand()) return;

    ping(interaction);
    apod(interaction);
    facts(interaction);
    jarjar(interaction);
    newletter(interaction);
});

// discord bot login
client.login(process.env.DISCORD_TOKEN);