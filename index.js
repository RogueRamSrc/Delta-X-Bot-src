const express = require('express');
const app = express();
const port = 3000;
const url = 'https://www.reddit.com/r/meme/hot/.json?limit=100'
const https = require('https');
const http = require('https');
const commando = require('discord.js-commando')
const Memer = require("random-jokes-api");
var server = http.createServer(app);

app.get('/', (req, res) => res.send('Bot Online'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

/* To anyone reviewing my code I would just like to apologize about how messey my code is and that I know I should of implemented a command handler
but at the time I didn't (many many months ago) and will rewrite all my code for any further projects in discord.js to implement discord.js v13 and to
orginize my code. If you want to contact me directly for any reason you can on discord : @Rogue_Ram#4728 Also I've added comments thoughout my code to 
let you know whats going on.
*/

//Start of bot
const Discord = require("discord.js");
const client = new Discord.Client();
var prefix = "%";
// File system stuff for prefix and tickets
var fs = require("fs");


require('discord-buttons')(client);
//discord buttons for before v13 was fully released but buttons were
const disbut = require('discord-buttons');
var ticketsa = [];
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function writea(array, path) {
    fs.writeFileSync(path, JSON.stringify(array));
}
function reada(path) {
    const fileContent = fs.readFileSync(path);
    const array = JSON.parse(fileContent);
    return array;
}
client.on('clickButton', async (button) => {
   if(button.id === "ticket"){


const guild = client.guilds.cache.get('841723668278280222')
await button.clicker.fetch();
const cl = button.clicker.user;
if(ticketsa.includes(cl.id)){
  await button.reply.send('Ticket creation failed, please close your old ticket first!',true)
  return
}
await button.reply.send('Ticket Created, you can dismiss this message',true)
console.log(ticketsa)
ticketsa.push(cl.id)
await sleep(100)
writea(ticketsa,'./tickets.json')
const ticket = await guild.channels.create(`${cl.username}'s ticket`, {
  type: 'text',
  name: `name`,
  parent: '889147452018532393',
  topic: `${cl.id}`,
  permissionOverwrites: [
  { deny: 'VIEW_CHANNEL', id: guild.id },
  { allow: 'VIEW_CHANNEL', id: cl.id }
                            
                        ]
})
let closeticket = new disbut.MessageButton()
  .setStyle('red')
  .setID('closeticket')
  .setLabel('Click here to close this ticket!')
  let jointicket = new disbut.MessageButton()
  .setStyle('green')
  .setID('jointicket')
  .setLabel(`Click here to join the ticket of ${cl.tag}!`)
const niceembed = new Discord.MessageEmbed()
.setTitle(`Welcome to ${cl.username} Ticket!`)
.setColor(0x00ffb7)
.setDescription("Click the button below to close the ticket ")
.setFooter("-Delta X")
.setThumbnail("https://cdn.discordapp.com/icons/841723668278280222/6db645977afbe3b34f6ecf04cc7acb59.webp?size=128")
await button.channel.fetch();
await ticket.send(niceembed,closeticket)

   }
   else if(button.id === "closeticket"){
     await button.channel.fetch()
var remover = ticketsa.indexOf(button.channel.topic);
ticketsa.splice(remover, 1);
await sleep(100);
writea(ticketsa,'./tickets.json')
await sleep(100);
     button.channel.delete()
   }
   else if(button.id === "jointicket"){
     await button.clicker.fetch();
const cl = button.clicker.user;
     const guild = client.guilds.cache.get('817501569108017223')
     const id = button.message.content.replace("New ticket created! Click the button to join id: ","")
     console.log(id)
     
       await button.reply.send('Done',true)
       guild.channels.cache.get(id).overwritePermissions(
        cl.id,
        { 'VIEW_CHANNEL': true }
    )
    .then(console.log)

   }
});


client.on('ready', ()=> {
  console.log("Connected as " + client.user.tag)
    var file = fs.readFileSync("./prefix.txt", "utf8"); //get the prefix from the file to use thoughout the code
  prefix = file
  client.user.setActivity(`${file}help`, {type: ""})

})


client.on("message", function(message) { 
 if (message.author.bot) return;   //bots can't run commands
 if (message.guild === null){  //DM or group DM to prevent errors
            message.reply("(X╭╮X)")
             message.react('825593138683969557')
             let ballembed = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setTitle("Ohs Nos")
  .addField("You can not talk to me via DM!","Sighs")
  .setURL("https://lifes-painful.ml/discord")
  
  message.author.send(ballembed);
               let ballembed1 = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setTitle("DM")
  .addField(`${message.author} just dmed me the following:`,`${message.content}`)

  
   client.channels.cache.get('854771560492957696').send(ballembed1);

  return
}
if (!message.content.startsWith(prefix)) return; 
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  const user = message.mentions.users.first()

    if(command === 'kick') {
  if (!message.member.roles.cache.some(role => role.name === 'Bot Moderator')) {
      message.reply("You don't have permission to kick users.")
       message.react('825593138683969557')
      return
    }

    if(!user) {
      message.reply("You didn't tell me a user to kick!")
       message.react('825593138683969557')
      return
    }

    const sender = message.member
    const member = message.guild.member(user)
    if(member) {
      member.kick(`Kicked by ${sender}`).then(() => {
        message.channel.send(`cya ${user.tag}, ${sender}`)
          message.react('825591461856673802')
      })
    }
   }

   
   else if (command === "ticketmsg"){
     if (!message.member.roles.cache.some(role => role.name === 'Bot Moderator')) {
            message.reply("(X╭╮X)")
             message.react('825593138683969557')
             let ballembed = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setTitle("Ohs Nos")
  .addField("You don't have permission to send the ticket message!","Sighs")
  
  message.channel.send(ballembed);
  return
     }
     const niceembed = new Discord.MessageEmbed()
.setTitle(`Create a support ticket`)
.setColor(0x03ff6c)
.setDescription("Click the following button below to create a support ticket!")
.addField("Please"," Remember")
.addField(`​`,"​")
.addField(`-The server rules still apply in tickets`,"​")
.addField(`​`,"​")
.addField(`- Be patient, we will eventually get to your ticket`,"​")
.addField(`​`,"​")
.addField("- Make sure to tell us your reason as soon as you open your ticket even if were offline","​")
.addField(`​`,"​")
.setFooter("-Delta X Development")
.setThumbnail("https://cdn.discordapp.com/icons/841723668278280222/6db645977afbe3b34f6ecf04cc7acb59.webp?size=128")
  message.delete();
  let testb = new disbut.MessageButton()
  .setStyle('green')
  .setID('ticket')
  .setLabel('Click here to make a ticket!')
  message.channel.send(niceembed,testb)
}
     if(command === 'ban') {
    if (!message.member.roles.cache.some(role => role.name === 'Bot Moderator')) {
      message.reply("You don't have permission to kick users.")
       message.react('825593138683969557')
      return
    }

    if(!user) {
      message.reply("You didn't tell me a user to ban!")
       message.react('825593138683969557')
      return
    }
	banreason = "bye bye"
    const sender = message.member
    const member = message.guild.member(user)
    if(member) {
      member.ban({reason: banreason}).then(() => {
        message.channel.send(`Bye Bye ${user.tag}, ${sender}`)
          message.react('825591461856673802')
      })
    }
   }
   
   









    if (command === 'mute') {

       if (!message.member.roles.cache.some(role => role.name === 'Bot Moderator')) {
            message.reply("You don't have permission to mute users.")
             message.react('825593138683969557')
            return
        }

    if(!user) {
      message.reply("You didn't tell me a user to mute!")
       message.react('825593138683969557')
      return
    }
    const sender = message.member
    const member = message.guild.member(user)
            if (member) {
                let muterole = message.guild.roles.cache.find(role => role.name === 'muted');


      member.roles.add(muterole.id).then(() => {
        message.channel.send(`Muted ${user.tag}, ${sender}`)
          message.react('825591461856673802')
      })
    }
   }



    if (command === 'unmute') {

       if (!message.member.roles.cache.some(role => role.name === 'Bot Moderator')) {
            message.reply("You don't have permission to mute users.")
             message.react('825593138683969557')
            return
        }

    if(!user) {
      message.reply("You didn't tell me a user to unmute!")
       message.react('825593138683969557')
      return
    }
    const sender = message.member
    const member = message.guild.member(user)
            if (member) {
                let muterole = message.guild.roles.cache.find(role => role.name === 'muted');
                let unmuterole = message.guild.roles.cache.find(role => role.name === 'Member');
		member.roles.remove(muterole.id)
      member.roles.add(Member.id).then(() => {
        message.channel.send(`Unmuted ${user.tag}, ${sender}`)
          message.react('825591461856673802')
      })
    }
   }
   
   
   
    
   
     else if (command === "help") {
  message.react('825591461856673802')
        let sEmbed = new Discord.MessageEmbed()
    .setColor(0x54D494)
    .setTitle("\ Here's a list of commands /")
    .addField("% kick [user]", "Kicks a user from the server. Admin only")
    .addField("% ban [user]", "Bans a user from the server. Admin only")
    .addField("% unmute [user]", "Unmutes a muted user. Admin only.")
    .addField("% mute [user]", "mutes a user. Admin only.")
	.addField("% clear [number]", "clears the number of messages max is 50. Admin only")
	.addField("% invite makes a invite to the server","invite")
  .addField("% donate","gives you my buymeacoffee page")
  .addField("% joke","tells a joke")
  .addField("% buymeacoffee","gives you my buymeacoffee page")
  .addField("% prefix [new prefix]","Changes the prefix. Admin only")
  .addField("\ Fun commands /","(:")
  .addField("% meme","Gets a meme from, yep you gessed it Reddit")
    .addField("% build","Builds a wall? (unsure why I added this)")
    .addField("This bot is made by <@552646436609720321>","for Delta X")
    message.channel.send({embed: sEmbed})
   }
   
    else if (command === "invite") {
        message.react('825591461856673802')
message.reply("https://lifes-painful.ml/discord")
}


else if (command === "build"){
  message.react('825591461856673802')
  message.reply("k ")
  let ballembed = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setDescription("Idk why this command exists")
  .attachFiles("https://i.imgur.com/qhFdISu.gif")
message.channel.send(ballembed);
}

else if (command === "joke"){
  message.react('825591461856673802')
  message.reply("k ")
  let jokes = Memer.joke()
  let ballembed = new Discord.MessageEmbed()
.setColor(0x54D494)
.setTitle(jokes)
.setFooter("Jokes provided by https://www.npmjs.com/package/random-jokes-api")

message.channel.send(ballembed);
}

else if (command === "script"){
  message.react('825591461856673802')
  message.reply("k ")
  let ballembed = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setTitle("Click here to get the script")
  .setURL('https://lifes-painful.ml/viewscripts')
  .setFooter("Delta X")
message.channel.send(ballembed);
}

else if (command === "donate"){
  message.react('825591461856673802')
  message.reply("Wow, thanks")
  let ballembed = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setTitle("Click here to buy me a coffee")
  .addField("Wow if you do go though with this","Thank you so much it will help continue Delta X development and keep it free of use!")
  .setURL('https://lifes-painful.ml/buymeacoffee.html')
  .setFooter("Delta X")
message.channel.send(ballembed);
}

else if (command === "buymeacoffee"){
  message.react('825591461856673802')
  message.reply("Wow, thanks")
  let ballembed = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setTitle("Click here to buy me a coffee")
  .addField("Wow if you do go though with this","Thank you so much it will help continue Delta X development and keep it free of use!")
  .setURL('https://lifes-painful.ml/buymeacoffee.html')
  .setFooter("Delta X")
message.channel.send(ballembed);
}

else if (command === "prefix"){
   if (!message.member.roles.cache.some(role => role.name === 'Bot Moderator')) {
            message.reply("(X╭╮X)")
             message.react('825593138683969557')
             let ballembed = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setTitle("Ohs Nos")
  .addField("You don't have permission to change the prefix!","Sighs")
  
  message.channel.send(ballembed);
  return
   if(!args[0]) {
          message.reply("(X╭╮X)")
             message.react('825593138683969557')
             let ballembed = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setTitle("Ohs Nos")
  .addField("You didn't give me the new prefix!","*Sighs*")
   }
  message.channel.send(ballembed);
  return
   }
    message.reply("k")
             message.react('825591461856673802')
             let ballembed = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setTitle("Prefix updated")
  .addField(`The new prefix is ${args[0]}`,"＼（＾０＾）／")
  prefix = args[0]
  fs.writeFile("./prefix.txt", args[0], function (err) {
client.user.setActivity(`${args[0]}help`, {type: ""})
    // Checks if there is an error
    if (err) return console.log(err);
  });
  message.channel.send(ballembed);
}

else if (command === "announce"){
  if (!message.member.roles.cache.some(role => role.name === 'Bot Moderator')) {
            message.reply("(X╭╮X)")
             message.react('825593138683969557')
             let ballembed = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setTitle("Ohs Nos")
  .addField("You don't have permission to send a message in announcements!","Sighs")
  
  message.channel.send(ballembed);
  return
  }
client.channels.cache.get('841723767688658944').send(message.content.replace("!announce",""))
//message.reply(message.content.replace("!test",""))
}

else if (command === "poll"){
  if (!message.member.roles.cache.some(role => role.name === 'Bot Moderator')) {
            message.reply("(X╭╮X)")
             message.react('825593138683969557')
             let ballembed = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setTitle("Ohs Nos")
  .addField("You don't have permission to create a poll!","Sighs")
  
  message.channel.send(ballembed);
  return
  }
client.channels.cache.get('857720478197612564').send(message.content.replace("!poll",""))
            .then(function (message) {
              message.react("857725129935814657")
              message.react("857725129927688213")
});
return
//message.reply(message.content.replace("!test",""))
}

else if (command === "status"){
  message.react('825591461856673802')
  message.reply("k ")
  let ballembed = new Discord.MessageEmbed()
  .setColor(0x54D494)
  .setFooter("Delta X")
  .attachFiles("https://lifes-painful.ml/images/oau.png")
message.channel.send(ballembed);
}


    else if (command === "meme") {  //this command gets a random post from the one and only r/meme or any other subreddit I set
        message.react('825591461856673802')
https.get(url, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                var response = JSON.parse(body)
                var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

                if (index.post_hint !== 'image') {

                    var text = index.selftext
                    const textembed = new Discord.MessageEmbed()
                        .setTitle(subRedditName)
                        .setColor(0x54D494)
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)

                    message.channel.send(textembed)
                }

                var image = index.preview.images[0].source.url.replace('&amp;', '&')
                var title = index.title
                var link = 'https://reddit.com' + index.permalink
                var subRedditName = index.subreddit_name_prefixed

                if (index.post_hint !== 'image') {
                    const textembed = new Discord.RichEmbed()
                        .setTitle(subRedditName)
                        .setColor(0x54D494)
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)

                    message.channel.send(textembed)
                }
                console.log(image);
                const imageembed = new Discord.MessageEmbed()
                    .setTitle(subRedditName)
                    .setImage(image)
                    .setColor(0x54D494)
                    .setDescription(`[${title}](${link})`)
                    .setURL(`https://reddit.com/${subRedditName}`)
                message.channel.send(imageembed)
            }).on('error', function (e) {
               message.react('825593138683969557')
                console.log('Got an error: ', e)
            })
        })
}


     if(command === 'clear') {  //clear a messages then delete the confirmation message
		      if (!message.member.roles.cache.some(role => role.name === 'Bot Moderator')) {
      message.reply("You don't have permission to clear.")
      return
    }
    let num = 2;
    if(args[0]){
      num = parseInt(args[0]) + 1;
    }
    console.log(num)
    message.channel.bulkDelete(num)
    message.channel.send(`Deleted ${args[0]} messages.`)
	  .then(message => {
                message.delete({ timeout: 1000 });
            })
  .catch();

  }
   
   

});                                      

client.login(); //login to the bot (I'm not including the token for security purposes)