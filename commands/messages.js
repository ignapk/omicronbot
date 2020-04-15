exports.run = (client, message, [com, type, ...args], level) => {
	switch(com) {
		case 'add':
		case 'edit':
			var name = args[0];
			args = args.splice(1);
			var msg =args.join(' ');
			if (type==null || name==null || client.messages.getProp(message.member.guild.name,type)==null || msg.trim()=="") {
				message.channel.send("Usage: messages <add|edit|list|remove> <welcome|goodbye|unknown|ban> [name] [message]");
				break;
			}

			client.messages.setProp(message.member.guild.name, `${type}.${name}`, msg);
			break;
		case 'ls':
		case 'list':
			if (type==null || client.messages.getProp(message.member.guild.name,type)==null) {
				message.channel.send("Usage: messages <add|edit|list|remove> <welcome|goodbye|unknown|ban> [name] [message]");
				break;
			}
			var list = "Active "+type+" messages:\n";
			for (let [key, value] of Object.entries(client.messages.getProp(message.member.guild.name,type))) list+=key+" => "+value+"\n";
			message.channel.send(list);
			break;
		case 'rm':
		case 'remove':
			var name = args[0];
			if (type==null || name==null || client.messages.getProp(message.member.guild.name,`${type}.${name}`)==null) {
				message.channel.send("Usage: messages <add|edit|list|remove> <welcome|goodbye|unknown|ban> [name] [message]");
				break;
			}
			client.messages.deleteProp(message.member.guild.name,`${type}.${name}`);
			break;
		default:
			message.channel.send("Usage: messages <add|edit|list|remove> <welcome|goodbye|unknown|ban> [name] [message]");
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["msg"],
  permLevel: "Administrator"
};

exports.help = {
  name: "messages",
  category: "Miscelaneous",
  description: "Manages various lists of random server messages.",
  usage: "messages <add|edit|list|remove> <welcome|goodbye|unknown|ban> [name] [message]"
};
