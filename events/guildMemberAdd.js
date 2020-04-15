// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
 // const settings = client.getSettings(member.guild.id);

  // If welcome is off, don't proceed (don't welcome the user)
  //if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  //const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // get the general channel
  let channel = member.guild.channels.find(val => val.name === 'general');
  if(!channel) channel = member.guild.channels.array()[1];

  // Send the welcome message to the welcome channel
  channel.send(client.tag(client.getRandom(client.messages.getProp(member.guild.name,'welcome')), member, false));

  // There's a place for more configs here.
  //member.guild.channels.find(c => c.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);

  //autoroles
  member.addRoles(member.guild.roles.filter(r=>client.roles.get(member.guild.name).includes(r.name)));
};
