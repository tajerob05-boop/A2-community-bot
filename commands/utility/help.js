const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('📚 عرض جميع الأوامر المتاحة'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('📚 قائمة الأوامر')
      .setDescription('استخدم الأوامر التالية:')
      .addFields(
        { name: '🛠️ الأوامر العامة', value: '/ping - اختبر سرعة البوت\n/help - عرض المساعدة\n/avatar - عرض صورة الملف الشخصي' },
        { name: '🎮 الألعاب', value: '/rps - لعبة حجر ورقة مقص\n/dice - رمي نرد\n/coinflip - رمي عملة' },
        { name: '⚙️ الإدارة', value: '/ban - حظر عضو\n/kick - طرد عضو\n/warn - تحذير عضو' },
        { name: '📊 المستوى', value: '/level - عرض مستواك\n/leaderboard - لوحة المستويات' }
      )
      .setFooter({ text: 'A2 COMMUNITY BOT' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
