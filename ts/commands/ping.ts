async function ping(interaction: any) {
    if (interaction.commandName === "ping") {
        await interaction.reply("Pong!");
    }
}

export default ping