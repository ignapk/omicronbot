exports.run = async (client, message, [user, ...args], level) => { // eslint-disable-line no-unused-vars
	var member= message.mentions.members.array()[0];
	var time=args.join(' ');
	if(member==null || time.trim()=="") message.channel.send("Usage: bigmute [user] [time]");
	else
	message.channel.send(member.user.toString()+' shut up for '+time);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "bigmute",
  category: "Miscelaneous",
  description: "Bigmutes someone for a specified amount of time",
  usage: "bigmute [user] [time]"
};
