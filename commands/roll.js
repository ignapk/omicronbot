exports.run = async (client, message, [size, number], level) => { // eslint-disable-line no-unused-vars
  if (size == null) message.reply("Usage roll <size of dice> <number of dices>");
  if (isNaN(size) || (number != null && isNaN(number))) {message.reply("Size of dice and number of dices must be numbers you dummy"); return;}
  if (number == null) number=1; 
  var msg = "You rolled ";
  for (var i=0; i<number-1; i++) {
    msg += (Math.floor(Math.random()*size)+1).toString() + ", ";
  }
  msg += (Math.floor(Math.random()*size)+1).toString();
  message.reply(msg);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "roll",
  category: "Miscelaneous",
  description: "Rolls imaginary dice with given sides and the number of draws",
  usage: "roll <size of the dice> <number of dices>"
};
