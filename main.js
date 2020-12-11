const Discord = require('discord.js');

var bot = new Discord.Client();

var prefix = ("!");
bot.login("Put your token here");

bot.on('ready', () => {
	console.log("Global ready !");
});

bot.on('message', message => {

	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	if (message.content.startsWith(prefix + "sendglobal")) {
		let argson = message.content.split(" ").slice(1);
		let vcsmsg = argson.join(" ")
		if(!vcsmsg) return message.reply("Please add a message to send.");
		bot.guilds.cache.forEach(guild => {
			if (guild == message.guild) return;
			let channel = guild.channels.cache.find(ch => ch.name === "global");
			if (!channel) return;
			let embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setAuthor(message.author.tag + " | Global Chat")
				.setDescription(vcsmsg)
				.setFooter("Server: " + message.guild.name)
				.setTimestamp()
			channel.send(embed);
		})
	}
});