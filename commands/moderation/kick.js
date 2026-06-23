const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('👢 طرد عضو')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('العضو المراد طرده')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('السبب')
        .setRequired(false)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has('KickMembers')) {
      await interaction.reply({ content: '❌ ليس لديك صلاحية الطرد!', ephemeral: true });
      return;
    }

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'لم يتم تحديد السبب';

    try {
      await interaction.guild.members.kick(user, reason);
      
      const embed = new EmbedBuilder()
        .setColor('#ff6600')
        .setTitle('👢 تم الطرد')
        .addFields(
          { name: 'العضو', value: `<@${user.id}>`, inline: true },
          { name: 'السبب', value: reason, inline: true }
        )
        .setFooter({ text: 'A2 COMMUNITY BOT' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء الطرد!', ephemeral: true });
    }
  },
};
