module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Bot logged in as ${client.user.tag}`);
    client.user.setPresence({
      activities: [{
        name: '/help | A2 COMMUNITY',
        type: 0,
      }],
      status: 'online',
    });
  },
};
