const Discord = require('discord.js');
var bot = new Discord.Client();
const moment = require('moment');

var prefix = ("!");
bot.login("your token here");

bot.on('ready', () => {
	console.log("Global ready!");
});


bot.on('message', message => {


	if (message.content.startsWith(prefix + "globaltimer")) {
		setInterval(() => {
			bot.guilds.cache.forEach(guild => {
				let channel = guild.channels.cache.find(ch => ch.name === "global");
				if (!channel) return;
				messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
				embed = new Discord.MessageEmbed()
					.setTitle("REMINDER")
					.setColor('0x992D22')
					.setDescription(`**1)** Be respectful!\n**2)** No spamming of any kind allowed!\n**3)** No Server Invites\n**NOTE:** This chat is unmoderated! There might be NSFW-Content. But do us a favor, dont make us ban you from the chat.\n_ _\n Sent at: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)

					.setThumbnail("https://i.postimg.cc/qqMHkyvF/Capture.png")
					.setFooter("Global Message REMINDER")
				channel.send(embed);
			})
		}, 1 * 3600000)
	};


	const avicon = ("https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".jpeg");
	let code = (Math.random().toString(36).substr(2) + "_" + Math.random().toString(36).substr(2));
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;
	if (message.content.startsWith(prefix)) return;
	if (message.channel.name !== "global") return;


	bot.guilds.cache.forEach(guild => {
		if (guild == message.guild) {
			let ccc = guild.channels.cache.find(ch => ch.name === "global");
			if (!ccc) return;
			messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
			embed = new Discord.MessageEmbed()
				.setTitle("Outgoing message:")
				.setColor('0x2ECC71')
				.setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
				.setDescription(`${message}\n_ _\nSent at: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
				.setFooter("Global Message | Message ID: " + code)
				.setThumbnail(message.guild.iconURL())
			if (messageAttachment) embed.setImage(messageAttachment)
				.setTimestamp
			message.delete()
			message.channel.send(embed)


			//Outgoing Logger
			let logchannel = guild.channels.cache.find(ch => ch.name === "global-logs");
			if (!logchannel) return;
			if (!message.channel.name === "global-logs") return;
			messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
			embed = new Discord.MessageEmbed()
				.setTitle("MESSAGE LOG:")
				.setColor('0x992D22')
				.setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
				.setDescription(`${message}\n_ _\nSent at: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
				.setThumbnail(message.guild.iconURL())
				.setFooter("Global Message LOGS | Message ID: " + code)
			if (messageAttachment) embed.setImage(messageAttachment)
				.setTimestamp()
			logchannel.send(embed)
		};


		if (guild == message.guild) return;
		let channel = guild.channels.cache.find(ch => ch.name === "global");
		if (!channel) return;
		if (!message.channel.name == "global") return;
		messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
		embed = new Discord.MessageEmbed()
			.setTitle("Incoming Message:")
			.setColor('0x1135A8')
			.setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
			.setDescription(`${message}\n_ _\nSent at: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
			.setThumbnail(message.guild.iconURL())
			.setFooter("Global Message | Message ID: " + code)
		if (messageAttachment) embed.setImage(messageAttachment)
			.setTimestamp()
		channel.send(embed)


		let logchannel = guild.channels.cache.find(ch => ch.name === "global-logs");
		if (!logchannel) return;
		if (!message.channel.name === "global-logs") return;
		messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
		embed = new Discord.MessageEmbed()
			.setTitle("MESSAGE LOG:")
			.setColor('0x992D22')
			.setAuthor(message.author.tag + ` | ${message.guild.name}`, avicon)
			.setDescription(`${message}\n_ _\nSent at: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
			.setThumbnail(message.guild.iconURL())
			.setFooter("Global Message | Message ID: " + code)
		if (messageAttachment) embed.setImage(messageAttachment)
			.setTimestamp()
		logchannel.send(embed);

	})
});
