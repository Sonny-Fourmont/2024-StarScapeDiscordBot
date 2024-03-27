import { exec } from "child_process";

async function facts(interaction: any) {
    if (interaction.commandName === "fact") {
        await interaction.deferReply();
        exec(`python3 ./assets/script/UpdateFact.py get`, async (error, stdout, stderr) => {
            console.log(stdout);
            await interaction.editReply(stdout);
        });
    }

    if (interaction.commandName === "newfact") {
        if (!interaction.options.get('fact'))
            await interaction.reply("Please enter your fact ! (required)");
        else {
            const arg = interaction.options.get('fact').value;
            await interaction.deferReply();
            exec(`python3 ./assets/script/UpdateFact.py add ${interaction.user.globalName} "${arg}"`, async (error, stdout, stderr) => {
                console.log(stdout);
                await interaction.editReply("Fact as been added to our database !");
            });
        }
    }

    if (interaction.commandName === "removefact") {
        if (!interaction.options.get('index'))
            await interaction.reply("Please the index (1 for the first etc...) of your fact ! (required)");
        else {
            const arg = interaction.options.get('index').value;
            await interaction.deferReply();
            exec(`python3 ./assets/script/UpdateFact.py remove ${interaction.user.globalName} ${arg}`, async (error, stdout, stderr) => {
                console.log(stdout);
                await interaction.editReply("Fact as been removed of our database !");
            });
        }
    }
}

export default facts