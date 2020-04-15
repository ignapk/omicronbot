exports.run = (client, message, [com, ...args], level) => {
	switch(com) {
		case 'add':
			var string = args.join(' ');
                        var res = string.split(">");
			if (string.trim()==""||!res[0]||!res[1])
			message.channel.send("Usage: autoresponder <add|list|remove> [trigger] > [respond]");
			else
			client.responds.setProp(message.member.guild.name, res[0].trim(), res[1].trim());
			break;
		case 'ls':
		case 'list':
			var array = client.responds.get(message.member.guild.name);
			var list = "Active autoresponds:\n";
			for (let [key,value] of Object.entries(client.responds.get(message.member.guild.name))) list+=key+" => "+value+"\n";
			message.channel.send(list);
			break;
		case 'rm':
		case 'remove':
			var string = args.join(' ');
			var res = string.split(">");
			if (string.trim()==""||!res[0])
			message.channel.send("Usage: autoresponder <add|list|remove> [trigger] > [respond]");
			else
			client.responds.remove(message.member.guild.name,res[0]);
			break;
		default:
			message.channel.send("Usage: autoresponder <add|list|remove> [trigger] > [respond]");
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "autoresponder",
  category: "Miscelaneous",
  description: "Manages automatic server responses. Note that you can shorten the sub commands list and remove to ls and rm respectively.",
  usage: "autoresponder <add|list|remove> [trigger] > [respond]"
};
