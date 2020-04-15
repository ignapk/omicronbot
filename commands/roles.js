exports.run = (client, message, [com, ...args], level) => {
	switch(com) {
		case 'add':
			var name =args.join(' ');
			if (name.trim()=="")
			message.channel.send("Usage: roles <add|list|remove> [name]");
			else
			client.roles.push(message.member.guild.name, name);
			break;
		case 'ls':
		case 'list':
			var array = client.roles.get(message.member.guild.name);
			var list = "Active autoroles:\n";
			for (var i=0; i<array.length; i++) list+=array[i]+"\n";
			message.channel.send(list);
			break;
		case 'rm':
		case 'remove':
			var name = args.join(' ');
			if (name.trim()=="" || !client.roles.get(message.member.guild.name).includes(name))
			message.channel.send("Usage: roles <add|list|remove> [name]");
			else
			client.roles.remove(message.member.guild.name,name);
			break;
		default:
			message.channel.send("Usage: roles <add|list|remove> [name]");
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "roles",
  category: "Miscelaneous",
  description: "Manages various lists of automatic server roles. Note that you can shorten the sub commands list and remove to ls and rm respectively.",
  usage: "roles <add|list|remove> [name]"
};
