module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers:`, "ready");
  // Log connected guilds and create corresponding messages objects
  client.guilds.forEach(g=>{
    client.logger.log(`${g.name}`, "ready");
    client.messages.ensure(g.name, {welcome: {default: "Default welcome message"}, goodbye: {default: "Default goodbye message"}, unknown: {default: "Default unknown message"}, ban:{default:"Default ban message"}, troll:{default:"Default troll message"}});
    client.roles.ensure(g.name, ["Default role name"]);
    client.responds.ensure(g.name, {"Hello there": "General Kenobi?"});
    client.settings.ensure(g.name, {lol: false});
    client.guildsData.ensure(g.name, new client.guildDataModel({ guildID: g.id}));
  });

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${client.config.defaultSettings.prefix}help`, {type: "PLAYING"});

  // troll
  let time = Math.floor(Math.random()*(86400-10800+1)+10800)*1000;
//setTimeout(client.troll,time,client,client.guilds.find(val => val.name === 'someguildname'));
  //setTimeout(client.troll,time,client,client.guilds.find(val => val.name === 'Six Rainbow Sieges'));

  //register activity
  setInterval(client.doGuildIteration, 30000);

  // cookie speaks and spies!
var cookieSpeak = (function* (){
                while(true){
                var rl = require('readline').createInterface({
                 input: process.stdin,
                 output: process.stdout
                });
                console.log('Available guilds: ');
                client.guilds.forEach( g => { console.log(g.name); });
                console.log('Write name of the guild you want to send messages to below:');
                var answer = yield rl.question(' ', res=>cookieSpeak.next(res));
                var guild=client.guilds.find(val => val.name === answer);
                if(guild==null){ console.log('Guild not found, try again.');rl.close();continue;}
                var guildname=answer;
		client.guildname=guildname;
                console.log('Available channels:');
                guild.channels.forEach( (ch) => { console.log(ch.name); });
                console.log('Write name of the channel you want to send messages to below:');
                var name = yield rl.question(' ', res=>cookieSpeak.next(res));
                var channel = guild.channels.find(val => val.name === name);
                if(channel==null) {console.log('Channel not found, try again.');rl.close();continue;}
                var channelname=name;
		client.channelname=channelname;	
                console.log('Send messages to '+guild.name+'#'+channel.name+' by writing them below:');
                var ri = yield rl.on('line', (input) => {
                        switch(input){
                        case 'exit':
                                client.spy=false;
                                cookieSpeak.next(input);return;break;
                        case 'spy':
                                client.spy=true;
                                console.log('Spying on '+guild.name+'#'+channel.name+':');break;
                        default:
                                channel.send(input);
                        }});
                rl.close();
                }
        })();
        cookieSpeak.next();
};
