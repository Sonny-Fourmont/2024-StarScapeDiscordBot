import { formattedDate } from "../app";
import { exec } from "child_process";

async function apod(interaction: any) {
    if (interaction.commandName === "apod") {
        if (!interaction.options.get('date')) {
            await interaction.deferReply();
            exec(`python3 ./assets/script/apod-maker.py ${formattedDate}`, async (error, stdout, stderr) => {
                console.log(stdout);
                if (!(stdout == "Image processing complete.\n"))
                    await interaction.editReply("Astronomy Picture Of The Day is not available yet");
                else
                    await interaction.editReply({files: [`./assets/images/APOD/iod-${formattedDate}.jpg`]});
            });
        } else {
            const arg = interaction.options.get('date').value;
            await interaction.deferReply();
            exec(`python3 ./assets/script/apod-maker.py ${arg}`, async (error, stdout, stderr) => {
                console.log(stdout);
                if (!(stdout == "Image processing complete.\n"))
                    await interaction.editReply(`Astronomy Picture Of The Day for the "${arg}" doesn't exist or is not available`);
                else
                    await interaction.editReply({files: [`./assets/images/APOD/iod-${arg}.jpg`]});
            });
        }
    }
}

export default apod