const Discord = require('discord.js');
const config = require('../config.json');
const fs = module.require("fs")
const dbFile = global.db;
const exists = fs.existsSync(dbFile);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbFile);

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(config.prefix)) return;
  
  db.all(`SELECT * FROM Users WHERE Tag = '${message.author.id}'`, (err, items) => {
    const gems = parseInt(items[0].Gems);
    const perks = items[0].Perks;
    

    
    if(args.join(" ").toLowerCase() == 'double egg') {
      if(perks == 'd') return message.channel.send('You already own **Double Egg** perk!');
      if(gems < 1000) return message.channel.send(`Not enough **Gems** <:Gem:592857805380255745>! You need **${1000 - gems}** more!`);
      let embed = new Discord.RichEmbed()
      .setAuthor('Buy', bot.user.displayAvatarURL)
      .setDescription('Are you sure you want to buy **Double Egg** for <:Gem:592857805380255745> **1000**?')
      .setThumbnail('https://i.imgur.com/qpb0uIj.png')
      .setFooter('React with ✅ or ❌')
      .setTimestamp()
      const chat = message;
      message.channel.send(embed)
      .then((message) => {
        message.react('✅').then(() => message.react("❌"))
        message.awaitReactions(filter, {max: 1, time: 10000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();
          
          if (reaction.name = "✅") {
            db.run("UPDATE Users SET Perks = ? WHERE Tag = ?", 'd', chat.author.id)
          } else {
            return;
          }
        })
        setTimeout(() => { 
          message.delete(); 
        }, 10000);
      })
      const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
      };
    }

    if(args.join(" ").toLowerCase() == 'triple egg') {
      if(perks == 'd') return message.channel.send('You already own **Double Egg** perk!');
      if(gems < 2000) return message.channel.send(`Not enough **Gems** <:Gem:592857805380255745>! You need **${2000 - gems}** more!`);
      let embed = new Discord.RichEmbed()
      .setAuthor('Buy', bot.user.displayAvatarURL)
      .setDescription('Are you sure you want to buy **Triple Egg** for <:Gem:592857805380255745> **2000**?')
      .setThumbnail("https://i.imgur.com/peud2fR.png")
      .setFooter('React with ✅ or ❌')
      .setTimestamp()
      
      const chat = message;
      message.channel.send(embed)
      .then((message) => {
        message.react('✅').then(() => message.react("❌"))
        message.awaitReactions(filter, {max: 1, time: 10000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();
          
          if (reaction.name = "✅") {
            db.run("UPDATE Users SET Perks = ? WHERE Tag = ?", 't', chat.author.id)
          } else {
            return;
          }
        })
        setTimeout(() => { 
          message.delete(); 
        }, 10000);
      })
      const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
      };
    }
  })
}

module.exports.help = {
  name: "buy"
}