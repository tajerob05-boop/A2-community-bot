const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('🖼️ عرض صورة الملف الشخصي')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('اختر عضو')
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`🖼️ صورة ${user.username}`)
      .setImage(user.displayAvatarURL({ size: 512 }))
      .setFooter({ text: 'A2 COMMUNITY BOT' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
