module.exports = (client, member) => {
  // get the general channel
  var channel = member.guild.channels.find(val => val.name === 'general'); 
  if(!channel) member.guild.channels.array()[1];
  // Send the goodbye message to the welcome channel
  member.guild.fetchBans().then(bans =>{ 
    if(bans.has(member.user.id)){
      channel.send(client.tag(client.getRandom(client.messages.getProp(member.guild.name,'ban')), member, true));
      return;
    }
    else if (member.roles.some(r=>["Shield Recruit"].includes(r.name)))
      channel.send(member.user.tag+' has escaped, 2500 renown for the person who brings them back alive!');
    else
      channel.send(client.tag(client.getRandom(client.messages.getProp(member.guild.name,'goodbye')), member, true));
  });
};
