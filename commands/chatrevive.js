exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	/*var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200)
			message.channel.send(this.responseText.substring(39));
	}
	xhr.open("POST", "https://www.conversationstarters.com/random.php", true);
	xhr.send();*/
	if(client.settings.get(message.guild.name,"lol")){message.channel.send("You do not have permission to use this command.");return;}
	var fs=require('fs');
	list = fs.readFileSync('list.txt').toString().split("\n");
	let index = Math.floor(Math.random()*(list.length-1));
	message.channel.send(list[index]);
	//list.splice(index,1);
	//fs.writeFileSync('list.txt', list.join("\n"));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["chat","chatrevuve","chatreviev","chatrevige","chatreive","chatrevibe","chatrevivr","chetrcuce","chatrcuce"],
  permLevel: "User"
};

exports.help = {
  name: "chatrevive",
  category: "Miscelaneous",
  description: "Revive chat with interesting topics",
  usage: "chatrevive"
};
