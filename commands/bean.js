exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var member = message.mentions.members.array()[0];
	if (member==null) message.channel.send("Usage: bean [user]");
	else
	message.channel.send(member.user.toString()+' has been beaned');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "bean",
  category: "Miscelaneous",
  description: "Beans someone",
  usage: "bean [user]"
};
