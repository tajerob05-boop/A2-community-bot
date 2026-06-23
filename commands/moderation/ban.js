const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('🚫 حظر عضو')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('العضو المراد حظره')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('السبب')
        .setRequired(false)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has('BanMembers')) {
      await interaction.reply({ content: '❌ ليس لديك صلاحية الحظر!', ephemeral: true });
      return;
    }

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'لم يتم تحديد السبب';

    try {
      await interaction.guild.members.ban(user, { reason });
      
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('🚫 تم الحظر')
        .addFields(
          { name: 'العضو', value: `<@${user.id}>`, inline: true },
          { name: 'السبب', value: reason, inline: true }
        )
        .setFooter({ text: 'A2 COMMUNITY BOT' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء الحظر!', ephemeral: true });
    }
  },
};
