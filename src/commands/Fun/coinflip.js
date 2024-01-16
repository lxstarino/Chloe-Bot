const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flip a coin")
    .addStringOption((option) => option
        .setName('coinside')
        .setDescription("Coin Side")
        .setRequired(true)
        .addChoices(
            {name: "Tail", value: "Tail"},
            {name: "Head", value: "Head"}
        )
    ),
    async execute(client, interaction) {
        const coinside = interaction.options.get('coinside').value
        const coin_side = ["Head", "Tail"]
        const result = coin_side[Math.floor(Math.random() * coin_side.length)]

        const settings = client.settings.storage.data.find(x => x.guildId === interaction.guild.id)
        let ls = settings ? settings.language ? require(`${process.cwd()}/src/languages/${settings.language}.json`) : require(`${process.cwd()}/src/languages/en.json`) : require(`${process.cwd()}/src/languages/en.json`)
        const { handlemsg } = require(`${process.cwd()}/src/handlers/functions`)

        client.basicEmbed({
            type: "reply",
            title: `${handlemsg(ls["cmds"]["coinflip"]["title"], {coinside: coinside})}`,
            desc: `${handlemsg(ls["cmds"]["coinflip"]["desc"], {result: result})}`,
            fields: coinside == result ? {name: `${ls["cmds"]["coinflip"]["fields"]["name"]}`, value: `${ls["cmds"]["coinflip"]["fields"]["win"]}`} : {name: `${ls["cmds"]["coinflip"]["fields"]["name"]}`, value: `${ls["cmds"]["coinflip"]["fields"]["lost"]}`},
            footer: {text: interaction.user.tag}
        }, interaction)
    }
}
