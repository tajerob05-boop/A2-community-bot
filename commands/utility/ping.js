const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('🏓 اختبر سرعة البوت'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🏓 Ping')
      .setDescription(`**Latency:** ${Date.now() - interaction.createdTimestamp}ms\n**API:** ${interaction.client.ws.ping}ms`)
      .setFooter({ text: 'A2 COMMUNITY BOT' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
