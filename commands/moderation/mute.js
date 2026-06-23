const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('🔇 كتم صوت عضو')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('العضو المراد كتم صوته')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('duration')
        .setDescription('المدة (مثل: 1h, 30m)')
        .setRequired(false)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has('ModerateMembers')) {
      await interaction.reply({ content: '❌ ليس لديك صلاحية!', ephemeral: true });
      return;
    }

    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id);
    
    try {
      await member.timeout(3600000); // 1 ساعة افتراضياً
      
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('🔇 تم كتم الصوت')
        .addFields(
          { name: 'العضو', value: `<@${user.id}>`, inline: true }
        )
        .setFooter({ text: 'A2 COMMUNITY BOT' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply({ content: '❌ حدث خطأ!', ephemeral: true });
    }
  },
};
