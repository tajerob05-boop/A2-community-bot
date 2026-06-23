const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('👤 معلومات العضو')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('اختر عضو')
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`👤 معلومات ${user.username}`)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: 'معرف المستخدم', value: user.id, inline: true },
        { name: 'اسم المستخدم', value: user.username, inline: true },
        { name: 'الإنشاء', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:d>`, inline: true },
        { name: 'الانضمام', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:d>`, inline: true },
        { name: 'الأدوار', value: member.roles.cache.map(r => r.toString()).join(', ') || 'لا توجد أدوار' }
      )
      .setFooter({ text: 'A2 COMMUNITY BOT' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
