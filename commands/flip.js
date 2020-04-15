exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  var sides = ["heads", "tails"];
  message.reply(sides[Math.floor(Math.random()*2)]);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "flip",
  category: "Miscelaneous",
  description: "Flips a virtual coin",
  usage: "flip"
};
