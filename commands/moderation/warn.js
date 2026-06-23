const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('⚠️ تحذير عضو')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('العضو المراد تحذيره')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('السبب')
        .setRequired(false)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has('ModerateMembers')) {
      await interaction.reply({ content: '❌ ليس لديك صلاحية التحذير!', ephemeral: true });
      return;
    }

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'لم يتم تحديد السبب';

    const embed = new EmbedBuilder()
      .setColor('#ffff00')
      .setTitle('⚠️ تحذير')
      .addFields(
        { name: 'العضو', value: `<@${user.id}>`, inline: true },
        { name: 'السبب', value: reason, inline: true }
      )
      .setFooter({ text: 'A2 COMMUNITY BOT' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
