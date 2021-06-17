# Discord Global chat

## Introduction

A simple node.js bot to send message on multiple server in the same channel.

## Needs

You need to install Node.js and have a discord bot token on this page : https://discord.com/developers/applications

## Installation

Once you download the files and install node.js, make 'npm install' in the project folder. Then, go to the main.js file and add the asked informations on line 65 and 74
```javascript
{
// Your prefix to start the hourly reminder and for others to use the help command
var prefix = "c!";
// ID to delete other users messages and use blacklist command
const ownerID = "215534700284870658"
// name of the channel to chat in and check for
const globalchat = "community-chat"
// name of the log channel
const logchat = "ccc-logs"
// put your token there
bot.login("token_here");
// start the bot and enjoy

}
```
When you run the bot, create "global" channel on the server where the bot is then send a message in that channel to send it to all the servers.

Thanks to Cynthia Dev for the update 

(no problem. I updated your readme as well this time :P )
## Others Bots

Discord-Image-to-twitter : https://github.com/bycop/Discord-Image-to-twitter <br>
Discord-Serverlist-InviteLinkByID : https://github.com/bycop/Discord-Serverlist-InviteLinkByID <br>
Discord-Fivem-Serverstats : https://github.com/bycop/Discord-Fivem-Serverstats <br>
Discord-csgo-Serverstats : https://github.com/bycop/Discord-csgo-Serverstats
