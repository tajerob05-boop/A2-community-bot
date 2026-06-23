const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('🎮 لعبة حجر ورقة مقص')
    .addStringOption(option =>
      option.setName('choice')
        .setDescription('اختر: حجر - ورقة - مقص')
        .addChoices(
          { name: '🪨 حجر', value: 'rock' },
          { name: '📄 ورقة', value: 'paper' },
          { name: '✂️ مقص', value: 'scissors' }
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const choices = ['rock', 'paper', 'scissors'];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    const userChoice = interaction.options.getString('choice');

    const choiceEmoji = {
      rock: '🪨',
      paper: '📄',
      scissors: '✂️'
    };

    let result;
    if (userChoice === botChoice) {
      result = 'تعادل! 🤝';
    } else if (
      (userChoice === 'rock' && botChoice === 'scissors') ||
      (userChoice === 'paper' && botChoice === 'rock') ||
      (userChoice === 'scissors' && botChoice === 'paper')
    ) {
      result = 'فزت! 🎉';
    } else {
      result = 'خسرت! 😢';
    }

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🎮 حجر ورقة مقص')
      .addFields(
        { name: 'اختيارك', value: choiceEmoji[userChoice], inline: true },
        { name: 'اختياري', value: choiceEmoji[botChoice], inline: true },
        { name: 'النتيجة', value: result, inline: false }
      )
      .setFooter({ text: 'A2 COMMUNITY BOT' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
