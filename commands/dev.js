 const Discord = require('discord.js');
const config = require('../config.json');
const fs = module.require("fs")
const dbFile = global.db;
const exists = fs.existsSync(dbFile);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbFile);
const { addpet } = require('../modules/addpet.js');
const { addgems } = require('../modules/addgems.js');

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(config.prefix)) return;
  const devs = [
    "302599378332549121",
    "302527751745961985",
    "198135885118570497",
    "251123922005786624",
    "374756186525794305"
  ]
  
  if(!devs.includes(message.author.id)) return;
  
  if(args[0].toLowerCase() == "gems") {
    db.run(`UPDATE Users SET Gems = '${args[2]}' WHERE Tag = '${args[1]}'`);
    message.channel.send(`Successfully set user **${args[1]}** Gems to **${args[2]}**`);
  }
  
  if(args[0].toLowerCase() == "eggs") {
    db.run(`UPDATE Users SET Eggs = '${args[2]}' WHERE Tag = '${args[1]}'`);
    message.channel.send(`Successfully set user **${args[1]}** Eggs to **${args[2]}**`)
  }
  
  if(args[0].toLowerCase() == "addpet") {
    const petId = `<:${args[1]}:${args[2]}>`
    addpet(petId, args[3]);
    message.channel.send(`Successfully added **${args[1]}** to **${args[3]}**'s inventory`)
  }
  
  if(args[0].toLowerCase() == "perks") { // disgusting clean up please 
    var triples = [
      'triple egg',
      'triple',
      't'
    ]
    var doubles = [
      'double egg',
      'double',
      'd'
    ]
    
    if(triples.includes(args[1].toLowerCase())) var perks = 't'
    if(doubles.includes(args[1].toLowerCase())) var perks = 'd'
    if(args[1] === 'remove') var perks = ''
    if (perks === 't') var display = 'Triple Egg'
    if (perks === 'd') var display = 'Double Egg'
    
    
    db.run(`UPDATE Users SET Perks = '${perks}' WHERE Tag = '${args[2]}'`);
   if(perks === 't' || perks === 'd') {
     message.channel.send(`Successfully added perk **${display}** to user **${args[2]}**`);
   } else if(perks === '') {
     message.channel.send(`Successfully removed perks from user **${args[2]}**`)
   }
  }
  
  if(args[0].toLowerCase() == "reset") {
    if(args[1]) {
      db.run(`UPDATE Users SET Gems = '0' WHERE Tag = '${args[1]}'`)
      db.run(`UPDATE Users SET Eggs = '0' WHERE Tag = '${args[1]}'`)
      db.run(`UPDATE Users SET Perks = '' WHERE Tag = '${args[1]}'`)
      db.run(`UPDATE Users SET Inventory = '' WHERE Tag = '${args[1]}'`)
      message.channel.send(`Successfully reset user **${args[1]}**`)
      return;
    } else {
    db.run('DELETE FROM Users')
    message.channel.send(`Successfully reset Hatchverse DB`)
    }
  }
  if(args[0].toLowerCase() == "js") {
    var newargs = args.splice(1).join(" ")
    console.log(newargs)
    eval(newargs)
  }
  

}

module.exports.help = {
  name: "dev"
}