exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	client.settings.set(message.guild.name,{lol: !client.settings.get(message.guild.name,"lol")});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "hmm",
  category: "redrum your code sucks",
  description: "is this what i think it is?",
  usage: "oh yeah we're not gonna use that anymore"
};
