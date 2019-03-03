const commando = require('discord.js-commando');


class DiceRollCommand extends commando.Command {

constructor(client){

    super(client,{
      
        'name' : 'roll',
        'group' : 'random',
        'memberName' : 'roll',
        'description' : 'rolls a dice'
    });

}


async run (message,value) {
    if(value > 0 && value < 20){


    let userRoll = Math.floor(Math.random() * 20 ) + parseInt(value);
    let botRoll = Math.floor(Math.random() * 20 ) + 3;

    
    if (userRoll > botRoll){
        message.reply("User won " + " UserScore : " +  userRoll + " BotScore : " +  botRoll); 
    }
    else if (botRoll > userRoll){
        message.reply("Bot won " + " UserScore : " +  userRoll + " BotScore : " +  botRoll); 
    }else{
        message.reply("Draw" ); 
    }
}else{


message.reply("You have to write !roll + your attack stats");

}


}
}


module.exports = DiceRollCommand;