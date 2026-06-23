const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dice')
    .setDescription('🎲 رمي نرد')
    .addIntegerOption(option =>
      option.setName('sides')
        .setDescription('عدد الأضلاع (افتراضي: 6)')
        .setRequired(false)
    ),
  async execute(interaction) {
    const sides = interaction.options.getInteger('sides') || 6;
    
    if (sides < 2 || sides > 100) {
      await interaction.reply({ content: '❌ يجب أن يكون عدد الأضلاع بين 2 و 100', ephemeral: true });
      return;
    }

    const result = Math.floor(Math.random() * sides) + 1;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🎲 رمي النرد')
      .addFields(
        { name: 'عدد الأضلاع', value: `${sides}`, inline: true },
        { name: 'النتيجة', value: `${result}`, inline: true }
      )
      .setFooter({ text: 'A2 COMMUNITY BOT' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
