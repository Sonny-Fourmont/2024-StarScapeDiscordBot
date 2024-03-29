import { formattedDate } from "../app";
import { exec } from "child_process";
import fs from "fs";

async function checkExist(interaction: any, path: string) {
    if (fs.existsSync(`${path}`)) {
        console.log(`${path}: already exists`);
        await interaction.editReply({files: [`${path}`]});
        console.log('Image sent')
        return true;
    } else {
        console.log(`${path}: doesn't exists`);
        return false;
    }
}

async function daily(interaction: any) {
    if (!await checkExist(interaction, `./assets/images/APOD/iod-${formattedDate}.jpg`)) {
        console.log("Image processing...");
        exec(`python3 ./assets/script/apod-maker.py ${formattedDate}`, async (error, stdout, stderr) => {
            console.log(stdout);
            if (!(stdout == "Image processing complete.\n")) {
                await interaction.editReply("Astronomy Picture Of The Day is not available yet");
                console.log("Astronomy Picture Of The Day is not available yet");
            } else {
                await interaction.editReply({files: [`./assets/images/APOD/iod-${formattedDate}.jpg`]});
                console.log('Image sent');
            }
        });
    }
}

async function custom(interaction: any, arg: string) {
    if (!await checkExist(interaction,  `./assets/images/APOD/iod-${arg}.jpg`)) {
        console.log("Image processing...");
        exec(`python3 ./assets/script/apod-maker.py ${arg}`, async (error, stdout, stderr) => {
            console.log(stdout);
            if (!(stdout == "Image processing complete.\n")) {
                await interaction.editReply(`Astronomy Picture Of The Day for the "${arg}" doesn't exists or is not available`);
                console.log(`Astronomy Picture Of The Day for the "${arg}" doesn't exists or is not available`);
            } else {
                await interaction.editReply({files: [`./assets/images/APOD/iod-${arg}.jpg`]});
                console.log('Image sent');
            }
        });
    }
}

async function parseArgs(args: string) {
    const splittedArgs: string[] = args.split("/", 3);
    const parsedArgs: string = `${splittedArgs[2]}-${splittedArgs[1]}-${splittedArgs[0]}`;
    console.log(parsedArgs)
    return parsedArgs;
}

async function apod(interaction: any) {
    if (interaction.commandName === "apod") {
        if (!interaction.options.get('date')) {
            await interaction.deferReply();
            daily(interaction);
        } else {
            const arg: string = interaction.options.get('date').value;
            const parsedArgs: string = await parseArgs(arg);
            await interaction.deferReply();
            custom(interaction, parsedArgs);
        }
    }
}

export default apod