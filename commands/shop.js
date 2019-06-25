const Discord = require('discord.js');
const config = require('../config.json');
const fs = module.require("fs")
const dbFile = global.db;
const exists = fs.existsSync(dbFile);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbFile);

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(config.prefix)) return;
  
  let embed = new Discord.RichEmbed()
  .setAuthor('Shop', bot.user.displayAvatarURL)
  .setFooter(bot.user.username)
  .setTimestamp()
  
  message.channel.send(embed)
}

module.exports.help = {
  name: "shop"
}