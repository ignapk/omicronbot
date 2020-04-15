module.exports = (client, member) => {
  client.registerActivity(member.guild, member, client.guildsData.get(member.guild.name));
};
