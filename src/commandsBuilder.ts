import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const clientId = `${process.env.APP_ID}`;
const guildId = `${process.env.GUILD_ID}`;
const token = `${process.env.DISCORD_TOKEN}`;

const commandsBuilder = [
    {
        name: "apod",
        description: "Shows you the Astronomy Picture Of The Day (By NASA)",
        options: [{
            name: "date",
            description: "DD/MM/YYYY",
            type: 3,
            require: false
        }]
    },
    {
        name: "fact",
        description: "Shows you a random space fact of our database !",
    },
    {
        name: "newfact",
        description: "Add a fact you knows with you username to our database (heavily moderated)",
        options: [{
            name: "fact",
            description: "enter your fact here (Your username will be add automatically)",
            type: 3,
            require: true
        }]
    },
    // {
    //     name: "removefact",
    //     description: "Remove a fact of yours of our database",
    //     options: [{
    //         name: "index",
    //         description: "enter the index (1 for the first etc...) of your fact here",
    //         type: 3,
    //         require: true
    //     }]
    // },
    {
        name: "jarjar",
        description: "Shows you a beautiful picture ;)"
    },
    {
        name: "newletter",
        description: "Not available yet"
    },
    {
        name: "ping",
        description: "Replies with Pong!"
    },
];

const rest = new REST({ version: "9" }).setToken(token);
(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commandsBuilder }
        );
        console.log("Successfully registered application commands.");
    } catch (error) {
        console.error(error);
    }
})();

export default commandsBuilder