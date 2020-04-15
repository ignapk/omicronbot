exports.run = async (client, message, [time, ...args], level) => { // eslint-disable-line no-unused-vars
	var text = args.join(' ');
	if (time==null || isNaN(time) || text.trim()=="") message.channel.send("Usage: remindme [time in seconds] [text]");
	else
	setTimeout(function() {
		message.reply(text);
	}, time*1000);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rmme"],
  permLevel: "User"
};

exports.help = {
  name: "remindme",
  category: "Miscelaneous",
  description: "A simple reminder, give time in seconds",
  usage: "remindme [time in seconds] [text]"
};
