const Discord = require("discord.js");
const request = require("request-promise");
const cheerio = require("cheerio");

var bot = new Discord.Client();
const moment = require("moment");

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

var prefix = "c!";
bot.login("put_token_here");

bot.on("ready", () => {
  console.log("global ready!");
});

bot.on("message", (message) => {
  //Hourly Reminder
  if (message.content.startsWith(prefix + "globaltimer")) {
    setInterval(() => {
      bot.guilds.cache.forEach((guild) => {
        let channel = guild.channels.cache.find(
          (ch) => ch.name === "globalchat"
        );
        if (!channel) return;
        messageAttachment =
          message.attachments.size > 0
            ? message.attachments.array()[0].url
            : null;
        embed = new Discord.MessageEmbed()
          .setTitle("RULES:")
          .setColor("0x992D22")
          .setAuthor("globalchat")
          .setDescription(
            `**1)** Be respectful!\n**2)** No spamming of any kind allowed!\n**3)** No Server Invites\n_ _\n**NOTE:**\nThis chat is unmoderated! There might be NSFW-Content. But do us a favor, dont make us ban you!\n_ _\n Sent at: ${moment().format(
              "MMMM Do YYYY, h:mm:ss a"
            )}`
          )
          .setThumbnail("https://i.postimg.cc/qqMHkyvF/Capture.png")
          .setFooter("globalchat System Message");
        channel.send(embed);
      });
    }, 1 * 3600000);
  }

  //Some garbage
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
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.content.startsWith(prefix)) return;
  if (message.channel.name !== "globalchat") return;

  //outgoing sendable gif
  bot.guilds.cache.forEach(async (guild) => {
    if (guild == message.guild) {
      let global = guild.channels.cache.find(
        (ch) => ch.name === "globalchat"
      );
      if (!global) return;
      if (
        message.content.startsWith("https://media.tenor.com/") ||
        message.content.startsWith("https://media1.tenor.com") ||
        message.content.startsWith("https://media.discord") ||
        message.content.startsWith("https://cdn.discordapp") ||
        message.content.startsWith("https://images-ext-")
      ) {
        embed = new Discord.MessageEmbed()
          .setTitle("Outgoing message:")
          .setColor("0x2ECC71")
          .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
          .setDescription(
            ` \n_ _\nSent at: ${moment().format("MMMM Do YYYY, h:mm:ss a")}`
          )
          .setFooter("globalchat | Message ID: " + code)
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
            `${message}\n_ _\nSent at: ${moment().format(
              "MMMM Do YYYY, h:mm:ss a"
            )}`
          )
          .setThumbnail(message.guild.iconURL())
          .setFooter("global LOGS | Message ID: " + code)
          .setImage(message.content)
          .setTimestamp();
        logchannel.send(embed);
        return;
      }

      //Convertable outgoing gif
      if (
        message.content.startsWith("https://tenor.com/")
      ) {
        const gifUrl = await getGifFromLink(message.content);
        if (gifUrl) {
          embed = new Discord.MessageEmbed()
            .setTitle("Outgoing Message:")
            .setColor("0x2ECC71")
            .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
            .setDescription(
              ` \n_ _\nSent at: ${moment().format("MMMM Do YYYY, h:mm:ss a")}`
            )
            .setFooter("globalchat | Message ID: " + code)
            .setThumbnail(message.guild.iconURL())
            .setImage(gifUrl)
            .setTimestamp();
          message.delete();
          message.channel.send(embed);
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
              `${message}\n_ _\nSent at: ${moment().format(
                "MMMM Do YYYY, h:mm:ss a"
              )}`
            )
            .setThumbnail(message.guild.iconURL())
            .setFooter("global LOGS | Message ID: " + code)
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
              `Sadly, your gif isnt formated correctly!\nDiscord sucks sometimes... I know\n Try again with a different gif. Sorry\n_ _\nSent at: ${moment().format(
                "MMMM Do YYYY, h:mm:ss a"
              )}`
            )
            .setFooter("globalchat | Message ID: " + code)
            .setThumbnail(message.guild.iconURL())
            .setTimestamp();
          message.delete();
          message.channel.send(embed);
        }

        return;
      }

      //normal outgoing messsage
      messageAttachment =
        message.attachments.size > 0
          ? message.attachments.array()[0].url
          : null;
      embed = new Discord.MessageEmbed()
        .setTitle("Outgoing message:")
        .setColor("0x2ECC71")
        .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
        .setDescription(
          `${message}\n_ _\nSent at: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}`
        )
        .setFooter("globalchat | Message ID: " + code)
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
          `${message}\n_ _\nSent at: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}`
        )
        .setThumbnail(message.guild.iconURL())
        .setFooter("global LOGS | Message ID: " + code);
      if (messageAttachment) embed.setImage(messageAttachment).setTimestamp();
      logchannel.send(embed);
    }




    //Incoming sendable gif
    if (guild == message.guild) return;
    let channel = guild.channels.cache.find(
      (ch) => ch.name === "globalchat"
    );
    if (!channel) return;
    if (!message.channel.name == "globalchat") return;
    if (
      message.content.startsWith("https://media.tenor.com/") ||
      message.content.startsWith("https://media1.tenor.com") ||
      message.content.startsWith("https://media.discord") ||
      message.content.startsWith("https://cdn.discordapp") ||
      message.content.startsWith("https://images-ext-")
    ) {
      embed = new Discord.MessageEmbed()
        .setTitle("Incoming Message:")
        .setColor("0x1135A8")
        .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
        .setDescription(
          ` \n_ _\nSent at: ${moment().format("MMMM Do YYYY, h:mm:ss a")}`
        )
        .setFooter("globalchat | Message ID: " + code)
        .setThumbnail(message.guild.iconURL())
        .setImage(message.content)
        .setTimestamp();
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
          `${message}\n_ _\nSent at: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}`
        )
        .setThumbnail(message.guild.iconURL())
        .setFooter("global LOGS | Message ID: " + code)
        .setImage(message.content)
        .setTimestamp();
      logchannel.send(embed);
      return;
    }

    //Convertable incoming gif
    if (
      message.content.startsWith("https://tenor.com/")
    ) {
      const gifUrl = await getGifFromLink(message.content);
      if (gifUrl) {
        embed = new Discord.MessageEmbed()
          .setTitle("Incoming Message:")
          .setColor("0x1135A8")
          .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
          .setDescription(
            ` \n_ _\nSent at: ${moment().format("MMMM Do YYYY, h:mm:ss a")}`
          )
          .setFooter("globalchat | Message ID: " + code)
          .setThumbnail(message.guild.iconURL())
          .setImage(gifUrl)
          .setTimestamp();
        channel.send(embed);
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
            `${message}\n_ _\nSent at: ${moment().format(
              "MMMM Do YYYY, h:mm:ss a"
            )}`
          )
          .setThumbnail(message.guild.iconURL())
          .setFooter("global LOGS | Message ID: " + code)
          .setImage(gifUrl)
          .setTimestamp();
        logchannel.send(embed);
      } else {
        return
      }
    }

    //normal incoming message
    if (message.content.startsWith("https://tenor.com/")) { return; }
    messageAttachment =
      message.attachments.size > 0 ? message.attachments.array()[0].url : null;
    embed = new Discord.MessageEmbed()
      .setTitle("Incoming Message:")
      .setColor("0x1135A8")
      .setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
      .setDescription(
        `${message}\n_ _\nSent at: ${moment().format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`
      )
      .setThumbnail(message.guild.iconURL())
      .setFooter("globalchat | Message ID: " + code);
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
        `${message}\n_ _\nSent at: ${moment().format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`
      )
      .setThumbnail(message.guild.iconURL())
      .setFooter("global LOGS | Message ID: " + code);
    if (messageAttachment) embed.setImage(messageAttachment).setTimestamp();
    logchannel.send(embed);
  });
});
