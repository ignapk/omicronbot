const GuildSetupHelper = require("../modules/guild-setup-helper.js");

const setupHelpers = [];

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  var guildData = client.guildsData.get(message.guild.name);
  if(!guildData) guildData = new client.guildDataModel({ guildID: message.guild.id });

  return new Promise((resolve, reject) => {
        const helper = new GuildSetupHelper(message);
        let idx = setupHelpers.push(helper) - 1;

        const existingUsers = guildData ? guildData.users : null;

        helper.walkThroughSetup(client, message.channel, message.member, existingUsers).then(responseData => {
		console.log("stare");
		for (var i in guildData) console.log(i+": "+guildData[i]);
		console.log("nowe");
		for (var i in responseData) console.log(i+": "+responseData[i]);
		guildData = Object.assign(guildData, responseData);
                client.guildsData.set(message.guild.name,guildData);

                /* Wait half a second before resolving as a cheap workaround for race conditions.
                   The final setup step message sent by the user will be attached to the old config, and will
                   actually be registered after the setup finishes. Without this .5 sec wait, the old config would
                   immediately overwrite the new config in the database. */

                setTimeout(() => resolve("Setup complete!"), 500);
            }).catch(e => reject("Error walking through guild setup for guild " + message.guild.name + ".\n" + (e.message || e))).then(() => setupHelpers.splice(idx - 1, 1));
  });

};

exports.conf = { 
  enabled: true,
  guildOnly: false,
  aliases: [], 
  permLevel: "Administrator"
};

exports.help = { 
  name: "setup",
  category: "Miscelaneous",
  description: "Set up activity monitor for this server",
  usage: "setup"
};
