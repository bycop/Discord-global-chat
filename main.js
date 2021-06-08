// I called it "project-ccc". just rename it


const Discord = require('discord.js');
var bot = new Discord.Client();
const moment = require('moment');

var prefix = ("!");
bot.login("your token here");

bot.on('ready', () => {
	console.log("CCC ready!");
        });
		

bot.on('message', message => {


//Hourly Reminder
if (message.content.startsWith(prefix + "startCCCTimer")) {
setInterval(() => { 
bot.guilds.cache.forEach(guild => {
let channel = guild.channels.cache.find(ch => ch.name === "project-ccc");
			if (!channel) return;
			messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
				embed = new Discord.MessageEmbed()
				.setTitle("REMINDER")
				.setColor('0x992D22')
				.setAuthor("Cynthia-Community-Chat",)
	 .setDescription(`**1)** Be civil!\n**2)**Dont send any NSFW content\n**3)**Do not send any crashgifs!\n_ _\nEnjoy the CCC! Sent at: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
				.setThumbnail("https://i.postimg.cc/qqMHkyvF/Capture.png")
				.setFooter("CCC REMINDER")
				channel.send(embed);
})}, 1 * 3600000)};


//Some garbage
const avicon = ("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg");
let code = (Math.random().toString(36).substr(2) + "_" + Math.random().toString(36).substr(2));
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;
	if (message.content.startsWith(prefix)) return;
	if (message.channel.name !== "project-ccc") return;



		//Outgoing Messages
		bot.guilds.cache.forEach(guild => {
			if (guild == message.guild) {
				let ccc = guild.channels.cache.find(ch => ch.name === "project-ccc");
				if (!ccc) return;
				messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
				embed = new Discord.MessageEmbed()
				.setTitle("Outgoing message:")
				.setColor('0x2ECC71')
				.setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
				.setDescription(`${message}\n_ _\nSent at: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
				.setFooter("Project CCC | Message ID: " + code)
				.setThumbnail(message.guild.iconURL())
				if (messageAttachment) embed.setImage(messageAttachment)
				.setTimestamp
			message.delete()
			message.channel.send(embed)
				

			//Outgoing Logger
			let logchannel = guild.channels.cache.find(ch => ch.name === "project-ccc-logs");
			if (!logchannel) return;
			if (!message.channel.name === "project-ccc-logs") return;
			messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
				embed = new Discord.MessageEmbed()
				.setTitle("MESSAGE LOG:")
				.setColor('0x992D22')
				.setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
				.setDescription(`${message}\n_ _\nSent at: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
				.setThumbnail(message.guild.iconURL())
				.setFooter("CCC LOGS | Message ID: " + code)
				if (messageAttachment) embed.setImage(messageAttachment)
				.setTimestamp()
			logchannel.send(embed)
			};
			
			
			
			//Incoming Messages
			if (guild == message.guild) return;
			let channel = guild.channels.cache.find(ch => ch.name === "project-ccc");
			if (!channel) return;
			if (!message.channel.name == "project-ccc") return;
			messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
				embed = new Discord.MessageEmbed()
				.setTitle("Incoming Message:")
				.setColor('0x1135A8')
				.setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
				.setDescription(`${message}\n_ _\nSent at: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
				.setThumbnail(message.guild.iconURL())
				.setFooter("Project CCC | Message ID: " + code)
				if (messageAttachment) embed.setImage(messageAttachment)
				.setTimestamp()
			channel.send(embed)
			
			
			//Incoming Logger
			let logchannel = guild.channels.cache.find(ch => ch.name === "project-ccc-logs");
			if (!logchannel) return;
			if (!message.channel.name === "project-ccc-logs") return;
			messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
				embed = new Discord.MessageEmbed()
				.setTitle("MESSAGE LOG:")
				.setColor('0x992D22')
				.setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
				.setDescription(`${message}\n_ _\nSent at: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
				.setThumbnail(message.guild.iconURL())
				.setFooter("CCC LOGS | Message ID: " + code)
				if (messageAttachment) embed.setImage(messageAttachment)
				.setTimestamp()
			logchannel.send(embed);

		})
	});
