// Global Chat. Original Idea by bycop, now made & maintained by Cynthia Dev/VerstreuteSeele
// Note: This shit currently is messy af, I know that! It barely works but I dont have the time
// to actually make it look good currently. It could probs be half the size or less. again, I know
// 
// if you wanna make it look better, go ahead. I currently focus on adding everything first and cleaning
// it up later. 
//
// Because this file looks like shit, there will be notes EVERYWHERE! Bycop if you delete them im going to ****** you :*
//
// Cynthia Dev 2021


//standard trash
const Discord = require("discord.js");
const request = require("request-promise");
const cheerio = require("cheerio");
const db = require('quick.db')
var bot = new Discord.Client();
const moment = require("moment");
// Gets gifs from tenor links for embeds (yes discord doesnt do this themselves -.-)
const getGifFromLink = async (url) => {
  try {
    const response = await request({
      uri: url,
      header: {
        " accept": "image/webp,*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.5",
      },
      gzip: true,
    });
    const $ = cheerio.load(response);
    const gifUrl = $(`div.Gif`).find("img").attr("src");

    if (gifUrl) return gifUrl;
    else return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// PUT PREFIX AND TOKEN HERE!
var prefix = "c!";
const ownerID == "PUT YOUR ID HERE"
bot.login("put token here");

bot.on("ready", () => {
  console.log("global ready!");
});


bot.on("message", (message) => {

  // made a blacklist system. This here checks if the user trying to send a message is blacklisted and if he is, sends the embed below
  if (message.channel.name === "global-chat") {
    let user = db.get(`blacklist_${message.author.id}`);
    if (user == true) {
      embed = new Discord.MessageEmbed()
        .setTitle("You are banned!")
        .setColor("0x992D22")
        .setAuthor("System")
        .setDescription(
          `**Hey there, ${message.author.username}!\nYou have been banned from the global-chat!**\nThis might have a few reasons:\n**1)** You send illegal or other unwanted content (Including but not limited to: Gore, rape, murder, ch!ldp0rn)\n**2)** You were a dick to the community!\n**3)** Users and/or moderators suggested banning you for behaviour outside of this chat\n_ _\n*To get unbanned, join the Cynthia AI Support-Server (https://discord.gg/Xnyg477hym) and open a ticket. We might or might not unban you, as we see it fit!*\n_ _\n_ _\n Sent at: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}`
        )
        .setThumbnail("https://i.postimg.cc/qqMHkyvF/Capture.png")
        .setFooter("global-chat System Message");
      return message.channel.send(embed);
    }
  }




  //Hourly Rule reminder. Run the command here \/ to start it. good luck hitting an hour flat xD
  if (message.content.startsWith(prefix + "startglobalTimer")) {
    setInterval(() => {
      bot.guilds.cache.forEach((guild) => {
        let channel = guild.channels.cache.find(
          (ch) => ch.name === "global-chat"
        );
        if (!channel) return;
        messageAttachment =
          message.attachments.size > 0
            ? message.attachments.array()[0].url
            : null;
        embed = new Discord.MessageEmbed()
          .setTitle("RULES:")
          .setColor("0x992D22")
          .setAuthor("System")
		.setDescription(
			`**1)** Be respectful!\n**2)** No spamming of any kind allowed!\n**3)** No Server Invites\n_ _\n**COMMANDS:**\nTo edit a message use the following command:\n` + "`c!edit <Message ID> <New message>`\nExample:\n`c!edit jawf7fwaj_78afwfa Im edited now`" + `\n_ _\n To delete a message use the following command:\n` + "`c!delete <MessageID>`\nExample:\n`c!delete jawf7fwaj_78afwfa`\nIf you are the owner of the bot you can also blacklist people with:\n`c!blacklist <id>` amd unblacklist with the same command" + `\n_ _\n**NOTE:**\nWe *can* and **will** ban you from this chat if you dont behave well!\n_ _\n Sent at: ${moment().format(
			"MMMM Do YYYY, h:mm:ss a"
			)}`
		)
          .setThumbnail("https://i.postimg.cc/qqMHkyvF/Capture.png")
          .setFooter("global-chat System Message");
        channel.send(embed);
      });
    }, 1 * 36000000);
  }

  //help command
  if (message.content.startsWith(prefix + "help-global")) {
    embed = new Discord.MessageEmbed()
      .setTitle("RULES:")
      .setColor("0x992D22")
      .setAuthor("System")
      .setDescription(
        `**1)** Be respectful!\n**2)** No spamming of any kind allowed!\n**3)** No Server Invites\n_ _\n**COMMANDS:**\nTo edit a message use the following command:\n` + "`c!edit <Message ID> <New message>`\nExample:\n`c!edit jawf7fwaj_78afwfa Im edited now`" + `\n_ _\n To delete a message use the following command:\n` + "`c!delete <MessageID>`\nExample:\n`c!delete jawf7fwaj_78afwfa`\nIf you are the owner of the bot you can also blacklist people with:\n`c!blacklist <id>` amd unblacklist with the same command" + `\n_ _\n**NOTE:**\nWe *can* and **will** ban you from this chat if you dont behave well!\n_ _\n Sent at: ${moment().format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`
      )
      .setThumbnail("https://i.postimg.cc/qqMHkyvF/Capture.png")
      .setFooter("global-chat System Message");
    message.channel.send(embed);
  }


  //Some garbage for avatar fetching bc yes
  const avicon =
    "https://cdn.discordapp.com/avatars/" +
    message.author.id +
    "/" +
    message.author.avatar +
    ".jpeg";
  let code =
    Math.random().toString(36).substr(2) +
    "_" +
    Math.random().toString(36).substr(2);


  // no dms
  if (message.channel.type === "dm") return;




  // First command: delete
  if (message.content.startsWith(prefix + "delete")) {
    let user = db.get(`blacklist_${message.author.id}`);
    //check if user is banned
    if (user == true) {
      embed = new Discord.MessageEmbed()
        .setTitle("You are banned!")
        .setColor("0x992D22")
        .setAuthor("System")
        .setDescription(
          `**Hey there, ${message.author.username}!\nYou have been banned from the global-chat!**\nThis might have a few reasons:\n**1)** You send illegal or other unwanted content (Including but not limited to: Gore, rape, murder, ch!ldp0rn)\n**2)** You were a dick to the community!\n**3)** Users and/or moderators suggested banning you for behaviour outside of this chat\n_ _\n*To get unbanned, join the Cynthia AI Support-Server (https://discord.gg/Xnyg477hym) and open a ticket. We might or might not unban you, as we see it fit!*\n_ _\n_ _\n Sent at: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}`
        )
        .setThumbnail("https://i.postimg.cc/qqMHkyvF/Capture.png")
        .setFooter("global-chat System Message");
      return message.channel.send(embed);
    }
    //if not banned, get message and the ID in it
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    if (!isNaN(args[0])) return message.channel.send("Wrong Message-ID");
    bot.guilds.cache.forEach(async (guild) => {
      let channel = guild.channels.cache.find(
        //get all the channels
        (ch) => ch.name === "global-chat"
      );
      if (!channel) return
      const channelMessages = await channel.messages.fetch()
      channelMessages.forEach(async (msg) => {
        //if you are not the bot owner, you can only delete your message
        if (message.author.id !== ownerID) {
          try {
            if (msg?.embeds[0]?.footer?.text?.includes("Message ID: " + args[0]) && msg?.embeds[0]?.author?.name.includes(message.author.tag))
              await msg.delete();
          } catch (error) {
            console.error(error);
          } return;
        }
        // bot owner just needs the ID
        try {
          if (msg?.embeds[0]?.footer?.text?.includes(args[0]))
            await msg.delete();
        } catch (error) {
          console.error(error);
        };
      })
    })
    message.delete()
  }




  // AAAAAAAAAAAAAAAAAAAAAAAAAAAAARGH
  // EDIT COMMAND IS PAINFUL AF!!

  if (message.content.startsWith(prefix + "edit")) {
    let user = db.get(`blacklist_${message.author.id}`);
    //check if you´re banned
    if (user == true) {
      embed = new Discord.MessageEmbed()
        .setTitle("You are banned!")
        .setColor("0x992D22")
        .setAuthor("System")
        .setDescription(
          `**Hey there, ${message.author.username}!\nYou have been banned from the global-chat!**\nThis might have a few reasons:\n**1)** You send illegal or other unwanted content (Including but not limited to: Gore, rape, murder, ch!ldp0rn)\n**2)** You were a dick to the community!\n**3)** Users and/or moderators suggested banning you for behaviour outside of this chat\n_ _\n*To get unbanned, join the Cynthia AI Support-Server (https://discord.gg/Xnyg477hym) and open a ticket. We might or might not unban you, as we see it fit!*\n_ _\n_ _\n Sent at: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}`
        )
        .setThumbnail("https://i.postimg.cc/qqMHkyvF/Capture.png")
        .setFooter("global-chat System Message");
      return message.channel.send(embed);
    } //if not do some splicing wizzardry
    let messageArray = message.content.split(" ");
    let messageID = messageArray.shift();
    messageID = messageArray.shift();
    let newMessageContent = messageArray.join(" ");
    if (!isNaN(messageID)) return message.channel.send("Wrong Message-ID");
    messageAttachment =
      message.attachments.size > 0
        ? message.attachments.array()[0].url
        : null;
    bot.guilds.cache.forEach(async (guild) => {
      //the pain begins, check if your message is a gif link
      if (
        newMessageContent.startsWith("https://tenor.com/")
      ) {
        const gifUrl = await getGifFromLink(newMessageContent);
        if (guild == message.guild) {
          let channel = guild.channels.cache.find(
            (ch) => ch.name === "global-chat"
          );
          if (!channel) return
          const channelMessages = await channel.messages.fetch()
          channelMessages.forEach(async (msg) => {
            try {
              // if it is, and its your message then just edit the sh*t
              if (msg?.embeds[0]?.footer?.text?.includes("Message ID: " + messageID) && msg?.embeds[0]?.author?.name.includes(message.author.tag)) {
                embedNewOut = new Discord.MessageEmbed()
                  .setTitle("Edited Outgoing Message:")
                  .setColor("0x2ECC71")
                  .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
                  .setDescription(
                    `\n_ _\n_ _\n*Sent at: ${moment().format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}*`
                  )
                  .setFooter(`User ID: ${message.author.id} | Message ID: ${code}`)
                  .setThumbnail(message.guild.iconURL());
                if (messageAttachment) embedNewOut.setImage(messageAttachment)
                if (gifUrl) embedNewOut.setImage(gifUrl)
                await msg.edit(embedNewOut);
              }
            } catch (error) {
              console.error(error);
            } return;
          })
          // and send it to the logs (or into the gulag.... whatever)
          let logchannel = guild.channels.cache.find(
            (ch) => ch.name === "global-logs"
          );
          if (!logchannel) return;
          if (!message.channel.name === "global-logs") return;
          embed = new Discord.MessageEmbed()
            .setTitle("EDITED MESSAGE LOG:")
            .setColor("0x992D22")
            .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
            .setDescription(
              `${newMessageContent}\n_ _\n_ _\n*Sent at: ${moment().format(
                "MMMM Do YYYY, h:mm:ss a"
              )}*`
            )
            .setThumbnail(message.guild.iconURL())
            .setFooter(`global LOGS | User ID: ${message.author.id} | Message ID: ${code}`);
          if (messageAttachment) embedNewOut.setImage(messageAttachment).setTimestamp();
          if (gifUrl) embedNewOut.setImage(gifUrl)
          logchannel.send(embed);
        }
        // yes... we need a second part if its not our guild.. bc our guild gets a different embed than others.. lol
        //its the same as above in a different color
        if (guild == message.guild) return;
        let channel = guild.channels.cache.find(
          (ch) => ch.name === "global-chat"
        );
        if (!channel) return
        const channelMessages = await channel.messages.fetch()
        channelMessages.forEach(async (msg) => {
          try {
            if (msg?.embeds[0]?.footer?.text?.includes("Message ID: " + messageID) && msg?.embeds[0]?.author?.name.includes(message.author.tag)) {
              messageAttachment =
                message.attachments.size > 0 ? message.attachments.array()[0].url : null;
              embedNewIn = new Discord.MessageEmbed()
                .setTitle("Edited Incoming Message:")
                .setColor("0x1135A8")
                .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
                .setDescription(
                  `\n_ _\n*Sent at: ${moment().format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}*`
                )
                .setThumbnail(message.guild.iconURL())
                .setFooter(`User ID: ${message.author.id} | Message ID: ${code}`);
              if (messageAttachment) embedNewIn.setImage(messageAttachment).setTimestamp();
              if (gifUrl) embedNewIn.setImage(gifUrl)
              await await msg.edit(embedNewIn);
            }
          } catch (error) {
            console.error(error);
          } return;
        })
        let logchannel = guild.channels.cache.find(
          (ch) => ch.name === "global-logs"
        );
        if (!logchannel) return;
        if (!message.channel.name === "global-logs") return;
        if (
          newMessageContent.startsWith("https://tenor.com/")
        ) {
          const gifUrl = await getGifFromLink(newMessageContent);
          embed = new Discord.MessageEmbed()
            .setTitle("EDITED MESSAGE LOG:")
            .setColor("0x992D22")
            .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
            .setDescription(
              `${newMessageContent}\n_ _\n_ _\n*Sent at: ${moment().format(
                "MMMM Do YYYY, h:mm:ss a"
              )}*`
            )
            .setThumbnail(message.guild.iconURL())
            .setFooter(`global LOGS | User ID: ${message.author.id} | Message ID: ${code}`);
          if (messageAttachment) embed.setImage(messageAttachment).setTimestamp();
          if (gifUrl) embedNewOut.setImage(gifUrl)
          logchannel.send(embed);
        }
      }



      // deja vu? nah.. just the same if its not a gif. lol
      if (guild == message.guild) {
        let channel = guild.channels.cache.find(
          (ch) => ch.name === "global-chat"
        );
        if (!channel) return
        const channelMessages = await channel.messages.fetch()
        channelMessages.forEach(async (msg) => {
          try {
            if (msg?.embeds[0]?.footer?.text?.includes("Message ID: " + messageID) && msg?.embeds[0]?.author?.name.includes(message.author.tag)) {
              embedNewOut = new Discord.MessageEmbed()
                .setTitle("Edited Outgoing Message:")
                .setColor("0x2ECC71")
                .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
                .setDescription(
                  `${newMessageContent}\n_ _\n_ _\n*Sent at: ${moment().format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}*`
                )
                .setFooter(`User ID: ${message.author.id} | Message ID: ${code}`)
                .setThumbnail(message.guild.iconURL());
              if (messageAttachment) embedNewOut.setImage(messageAttachment)
              await msg.edit(embedNewOut);
            }
          } catch (error) {
            console.error(error);
          } return;
        })
        let logchannel = guild.channels.cache.find(
          (ch) => ch.name === "global-logs"
        );
        if (!logchannel) return;
        if (!message.channel.name === "global-logs") return;
        embed = new Discord.MessageEmbed()
          .setTitle("EDITED MESSAGE LOG:")
          .setColor("0x992D22")
          .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
          .setDescription(
            `${newMessageContent}\n_ _\n_ _\n*Sent at: ${moment().format(
              "MMMM Do YYYY, h:mm:ss a"
            )}*`
          )
          .setThumbnail(message.guild.iconURL())
          .setFooter(`global LOGS | User ID: ${message.author.id} | Message ID: ${code}`);
        if (messageAttachment) embedNewOut.setImage(messageAttachment).setTimestamp();
        logchannel.send(embed);
      }

      if (guild == message.guild) return;
      let channel = guild.channels.cache.find(
        (ch) => ch.name === "global-chat"
      );
      if (!channel) return
      const channelMessages = await channel.messages.fetch()
      channelMessages.forEach(async (msg) => {
        try {
          if (msg?.embeds[0]?.footer?.text?.includes("Message ID: " + messageID) && msg?.embeds[0]?.author?.name.includes(message.author.tag)) {
            messageAttachment =
              message.attachments.size > 0 ? message.attachments.array()[0].url : null;
            embedNewIn = new Discord.MessageEmbed()
              .setTitle("Edited Incoming Message:")
              .setColor("0x1135A8")
              .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
              .setDescription(
                `${newMessageContent}\n_ _\n_ _\n*Sent at: ${moment().format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}*`
              )
              .setThumbnail(message.guild.iconURL())
              .setFooter(`User ID: ${message.author.id} | Message ID: ${code}`);
            if (messageAttachment) embedNewIn.setImage(messageAttachment).setTimestamp();
            await await msg.edit(embedNewIn);
          }
        } catch (error) {
          console.error(error);
        } return;
      })
      let logchannel = guild.channels.cache.find(
        (ch) => ch.name === "global-logs"
      );
      if (!logchannel) return;
      if (!message.channel.name === "global-logs") return;
      embed = new Discord.MessageEmbed()
        .setTitle("EDITED MESSAGE LOG:")
        .setColor("0x992D22")
        .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
        .setDescription(
          `${newMessageContent}\n_ _\n_ _\n*Sent at: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}*`
        )
        .setThumbnail(message.guild.iconURL())
        .setFooter(`global LOGS | User ID: ${message.author.id} | Message ID: ${code}`);
      if (messageAttachment) embed.setImage(messageAttachment).setTimestamp();
      logchannel.send(embed);
    })
    message.delete()
  }


  // Here is our blacklist command. 
  if (message.content.startsWith(prefix + "blacklist")) {
    let user1 = db.get(`blacklist_${message.author.id}`);
    //check if blacklisted... just for fun and consistency
    if (user1 == true) {
      embed = new Discord.MessageEmbed()
        .setTitle("You are banned!")
        .setColor("0x992D22")
        .setAuthor("System")
        .setDescription(
          `**You have been banned from the "Global Chat"!**\nThis might have a few reasons:\n**1)** You send illegal or other unwanted content (Including but not limited to: Gore, rape, murder, ch!ldp0rn)\n**2)** You were a dick to the community!\n**3)** Users and/or moderators suggested banning you for behaviour outside of this chat\n_ _\n*Sent at: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}`
        )
        .setThumbnail("https://i.postimg.cc/qqMHkyvF/Capture.png")
        .setFooter("global-chat System Message");
      return message.channel.send(embed);
    }
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    //check if you are the bot owner
    if (message.author.id === ownerID) {
      let user = args[0];
      if (!user) return message.channel.send('Invalid user or id');

      let fetched = db.get(`blacklist_${user}`)
      // if not banned, do now
      if (!fetched) {
        db.set(`blacklist_${user}`, true)
        bot.guilds.cache.forEach(async (guild) => {
          let Announcement = guild.channels.cache.find(
            (ch) => ch.name === "global-chat"
          );
          if (!Announcement) return;
          embed = new Discord.MessageEmbed()
            .setTitle("USER BANNED:")
            .setColor("0x992D22")
            .setAuthor("System")
            .setDescription(
              `The user with the ID ${user} is now banned from the chat!\n_ _\n Sent at: ${moment().format(
                "MMMM Do YYYY, h:mm:ss a"
              )}`
            )
            .setThumbnail("https://i.postimg.cc/qqMHkyvF/Capture.png")
            .setFooter("global-chat System Message");
          Announcement.send(embed);
          let log = guild.channels.cache.find(
            (ch) => ch.name === "global-logs"
          );
          if (!log) return;
          log.send(embed)
        })
      } else {
        // if banned, unban
        db.delete(`blacklist_${user}`)
        bot.guilds.cache.forEach(async (guild) => {
          let Announcement = guild.channels.cache.find(
            (ch) => ch.name === "global-chat"
          );
          if (!Announcement) return;
          embed = new Discord.MessageEmbed()
            .setTitle("USER UNBANNED:")
            .setColor("0x992D22")
            .setAuthor("System")
            .setDescription(
              `The user with the ID ${user} is now unbanned from the chat!\n_ _\n Sent at: ${moment().format(
                "MMMM Do YYYY, h:mm:ss a"
              )}`
            )
            .setThumbnail("https://i.postimg.cc/qqMHkyvF/Capture.png")
            .setFooter("global-chat System Message");
          Announcement.send(embed);
          let log = guild.channels.cache.find(
            (ch) => ch.name === "global-logs"
          );
          if (!log) return;
          log.send(embed)
        })
      }
    } else {
      // i dont even fucking know why this is here
      message.channel.send("You aren't a manager.")
    }
    message.delete()
  }

  // commands done. now onto the messages. lets ignore the prefixes from now on!

  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  if (message.channel.name !== "global-chat") return;

  //outgoing sendable gif that has a direct link
  bot.guilds.cache.forEach(async (guild) => {
    if (guild == message.guild) {
      let global = guild.channels.cache.find(
        (ch) => ch.name === "global-chat"
      );
      if (!global) return;

      //check for some bs link starts
      if (
        message.content.startsWith("https://media.tenor.com/") ||
        message.content.startsWith("https://media1.tenor.com") ||
        message.content.startsWith("https://media.discord") ||
        message.content.startsWith("https://cdn.discordapp") ||
        message.content.startsWith("https://images-ext-")
      ) {
        // and slap it onto an embed
        embed = new Discord.MessageEmbed()
          .setTitle("Outgoing message:")
          .setColor("0x2ECC71")
          .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
          .setDescription(
            ` \n_ _\n*Sent at: ${moment().format("MMMM Do YYYY, h:mm:ss a")}*`
          )
          .setFooter(`User ID: ${message.author.id} | Message ID: ${code}`)
          .setThumbnail(message.guild.iconURL())
          .setImage(message.content)
          .setTimestamp();
        message.delete();
        message.channel.send(embed);

        //log it
        let logchannel = guild.channels.cache.find(
          (ch) => ch.name === "global-logs"
        );
        if (!logchannel) return;
        if (!message.channel.name === "global-logs") return;
        embed = new Discord.MessageEmbed()
          .setTitle("MESSAGE LOG:")
          .setColor("0x992D22")
          .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
          .setDescription(
            `${message}\n_ _\n_ _\n*Sent at: ${moment().format(
              "MMMM Do YYYY, h:mm:ss a"
            )}*`
          )
          .setThumbnail(message.guild.iconURL())
          .setFooter(`global LOGS | User ID: ${message.author.id} | Message ID: ${code}`)
          .setImage(message.content)
          .setTimestamp();
        logchannel.send(embed);
        return;
      }

      //Convertable outgoing gif. the one that needs the function at the start, you know...
      if (
        message.content.startsWith("https://tenor.com/")
      ) {
        const gifUrl = await getGifFromLink(message.content);
        if (gifUrl) {
          //embed
          embed = new Discord.MessageEmbed()
            .setTitle("Outgoing Message:")
            .setColor("0x2ECC71")
            .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
            .setDescription(
              ` \n_ _\n*Sent at: ${moment().format("MMMM Do YYYY, h:mm:ss a")}*`
            )
            .setFooter(`User ID: ${message.author.id} | Message ID: ${code}`)
            .setThumbnail(message.guild.iconURL())
            .setImage(gifUrl)
            .setTimestamp();
          message.delete();
          message.channel.send(embed);
          let logchannel = guild.channels.cache.find(
            (ch) => ch.name === "global-logs"
          );
          // log it
          if (!logchannel) return;
          if (!message.channel.name === "global-logs") return;
          embed = new Discord.MessageEmbed()
            .setTitle("MESSAGE LOG:")
            .setColor("0x992D22")
            .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
            .setDescription(
              `${message}\n_ _\n_ _\n*Sent at: ${moment().format(
                "MMMM Do YYYY, h:mm:ss a"
              )}*`
            )
            .setThumbnail(message.guild.iconURL())
            .setFooter(`global LOGS | User ID: ${message.author.id} | Message ID: ${code}`)
            .setImage(gifUrl)
            .setTimestamp();
          logchannel.send(embed);
        } else {
          //Show gif not found error msg
          embed = new Discord.MessageEmbed()
            .setTitle("Sorry bro :worried:")
            .setColor("0x992D22")
            .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
            .setDescription(
              `Sadly, your gif isnt formated correctly!\nDiscord sucks sometimes... I know\n Try again with a different gif. Sorry\n_ _\n*Sent at: ${moment().format(
                "MMMM Do YYYY, h:mm:ss a"
              )}*`
            )
            .setFooter(`User ID: ${message.author.id} | Message ID: ${code}`)
            .setThumbnail(message.guild.iconURL())
            .setTimestamp();
          message.delete();
          message.channel.send(embed);
        }

        return;
      }

      //normal outgoing messsage that doesnt need converting
      messageAttachment =
        message.attachments.size > 0
          ? message.attachments.array()[0].url
          : null;
      embed = new Discord.MessageEmbed()
        .setTitle("Outgoing message:")
        .setColor("0x2ECC71")
        .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
        .setDescription(
          `${message}\n_ _\n_ _\n*Sent at: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}*`
        )
        .setFooter(`User ID: ${message.author.id} | Message ID: ${code}`)
        .setThumbnail(message.guild.iconURL());
      if (messageAttachment) embed.setImage(messageAttachment).setTimestamp;
      message.delete();
      message.channel.send(embed);

      //normal Outgoing Logger
      let logchannel = guild.channels.cache.find(
        (ch) => ch.name === "global-logs"
      );
      if (!logchannel) return;
      if (!message.channel.name === "global-logs") return;
      messageAttachment =
        message.attachments.size > 0
          ? message.attachments.array()[0].url
          : null;
      embed = new Discord.MessageEmbed()
        .setTitle("MESSAGE LOG:")
        .setColor("0x992D22")
        .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
        .setDescription(
          `${message}\n_ _\n_ _\n*Sent at: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}*`
        )
        .setThumbnail(message.guild.iconURL())
        .setFooter(`global LOGS | User ID: ${message.author.id} | Message ID: ${code}`);
      if (messageAttachment) embed.setImage(messageAttachment).setTimestamp();
      logchannel.send(embed);
    }


    //Incoming sendable gif (yes ... its the same now)
    if (guild == message.guild) return;
    let channel = guild.channels.cache.find(
      (ch) => ch.name === "global-chat"
    );
    if (!channel) return;
    if (!message.channel.name == "global-chat") return;
    if (
      message.content.startsWith("https://media.tenor.com/") ||
      message.content.startsWith("https://media1.tenor.com") ||
      message.content.startsWith("https://media.discord") ||
      message.content.startsWith("https://cdn.discordapp") ||
      message.content.startsWith("https://images-ext-")
    ) {
      //slap into embed
      embed = new Discord.MessageEmbed()
        .setTitle("Incoming Message:")
        .setColor("0x1135A8")
        .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
        .setDescription(
          ` \n_ _\n*Sent at: ${moment().format("MMMM Do YYYY, h:mm:ss a")}*`
        )
        .setFooter(`User ID: ${message.author.id} | Message ID: ${code}`)
        .setThumbnail(message.guild.iconURL())
        .setImage(message.content)
        .setTimestamp();
      //and send it away
      channel.send(embed);

      //log it
      let logchannel = guild.channels.cache.find(
        (ch) => ch.name === "global-logs"
      );
      if (!logchannel) return;
      if (!message.channel.name === "global-logs") return;
      embed = new Discord.MessageEmbed()
        .setTitle("MESSAGE LOG:")
        .setColor("0x992D22")
        .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
        .setDescription(
          `${message}\n_ _\n_ _\n*Sent at: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}*`
        )
        .setThumbnail(message.guild.iconURL())
        .setFooter(`global LOGS | User ID: ${message.author.id} | Message ID: ${code}`)
        .setImage(message.content)
        .setTimestamp();
      logchannel.send(embed);
      // and go home :kekw:
      return;
    }

    //Convertable incoming gif that needs special care bc it has autism or something
    if (
      message.content.startsWith("https://tenor.com/")
    ) {
      const gifUrl = await getGifFromLink(message.content);
      if (gifUrl) {
        // no care.. just slapped into embed
        embed = new Discord.MessageEmbed()
          .setTitle("Incoming Message:")
          .setColor("0x1135A8")
          .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
          .setDescription(
            ` \n_ _\n*Sent at: ${moment().format("MMMM Do YYYY, h:mm:ss a")}*`
          )
          .setFooter(`User ID: ${message.author.id} | Message ID: ${code}`)
          .setThumbnail(message.guild.iconURL())
          .setImage(gifUrl)
          .setTimestamp();
        channel.send(embed);
        let logchannel = guild.channels.cache.find(
          (ch) => ch.name === "global-logs"
        );
        //and logged
        if (!logchannel) return;
        if (!message.channel.name === "global-logs") return;
        embed = new Discord.MessageEmbed()
          .setTitle("MESSAGE LOG:")
          .setColor("0x992D22")
          .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
          .setDescription(
            `${message}\n_ _\n_ _\n*Sent at: ${moment().format(
              "MMMM Do YYYY, h:mm:ss a"
            )}*`
          )
          .setThumbnail(message.guild.iconURL())
          .setFooter(`global LOGS | User ID: ${message.author.id} | Message ID: ${code}`)
          .setImage(gifUrl)
          .setTimestamp();
        logchannel.send(embed);
      } else {
        return
      }
    }

    //normal incoming message..
    //idk why we need the check at the beginning... but we do -.-
    if (message.content.startsWith("https://tenor.com/")) { return; }
    messageAttachment =
      message.attachments.size > 0 ? message.attachments.array()[0].url : null;
    embed = new Discord.MessageEmbed()
      .setTitle("Incoming Message:")
      .setColor("0x1135A8")
      .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
      .setDescription(
        `${message}\n_ _\n_ _\n*Sent at: ${moment().format(
          "MMMM Do YYYY, h:mm:ss a"
        )}*`
      )
      .setThumbnail(message.guild.iconURL())
      .setFooter(`User ID: ${message.author.id} | Message ID: ${code}`);
    if (messageAttachment) embed.setImage(messageAttachment).setTimestamp();
    channel.send(embed);

    //Incoming normal message Logger
    let logchannel = guild.channels.cache.find((ch) => ch.name === "global-logs");
    if (!logchannel) return;
    if (!message.channel.name === "global-logs") return;
    messageAttachment =
      message.attachments.size > 0 ? message.attachments.array()[0].url : null;
    embed = new Discord.MessageEmbed()
      .setTitle("MESSAGE LOG:")
      .setColor("0x992D22")
      .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
      .setDescription(
        `${message}\n_ _\n_ _\n*Sent at: ${moment().format(
          "MMMM Do YYYY, h:mm:ss a"
        )}*`
      )
      .setThumbnail(message.guild.iconURL())
      .setFooter(`global LOGS | User ID: ${message.author.id} | Message ID: ${code}`);
    if (messageAttachment) embed.setImage(messageAttachment).setTimestamp();
    logchannel.send(embed);
  });
}); // 808 lines.. fckn hell I could´ve made an entire music bot in here... lol
