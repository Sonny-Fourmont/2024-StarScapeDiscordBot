async function jarjar(interaction: any) {
    if (interaction.commandName === "jarjar") {
        await interaction.reply({files: ["./assets/images/jamPic/jarjar.png"]});
    }
}

export default jarjar