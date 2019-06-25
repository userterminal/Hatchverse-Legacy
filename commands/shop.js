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
  .setAuthor('Shop', bot.user.displayAvatarURL) //aaa noima add it to the descript
  .addField('Perks', `<:2xegg:592877627543388170> Double Egg - <:Gem:592857805380255745> **1000**\n<:3xegg:592878254654881802> Triple Egg - <:Gem:592857805380255745> **2000**`, true)
  .addBlankField(true)
  .addField
  .setFooter(bot.user.username)
  .setTimestamp()
  
  message.channel.send(embed)
}

module.exports.help = {
  name: "shop"
}