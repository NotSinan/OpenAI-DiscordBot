const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
const { OPEN_AI_TOKEN } = require('../config.json');

const configuration = new Configuration({
  apiKey: OPEN_AI_TOKEN,
});
const openai = new OpenAIApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('image')
		.setDescription('Generates an image.')
		.addStringOption(option => option.setName("prompt")
		.setDescription("Describe image.")),
	async execute(interaction) {
		interaction.deferReply()
		const prompt = interaction.options.getString('prompt');
		const response = await openai.createImage({
			prompt: `${prompt}`,
			n: 1,
			size: "1024x1024",
		  });

		await interaction.editReply(response.data.data[0].url);
	},
};