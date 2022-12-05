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
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		interaction.deferReply()
		const response = await openai.createImage({
			prompt: "Asian midget",
			n: 2,
			size: "1024x1024",
		  });
		
		console.log(response.data.data[0].url)

		
		await interaction.editReply("Hi");
	},
};