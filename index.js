const Discord = require('discord.js');
const client = new Discord.Client();


const jsdom = require("jsdom");
const { JSDOM } = jsdom;

client.on('message', (msg) => {
    let help = {
        "embed": {
            "color": 2321651,
            "fields": [
                {
                    "name": "!newest",
                    "value": "Latest banner in the jp server."
                },
                {
                    "name": "!year {year}",
                    "value": "Writes and search a banner from  the chosen year."
                },
                {
                    "name": "!next-banner",
                    "value": "Next upcomming Banner!"
                },
                {
                    "name": "!next-event",
                    "value": "Next upcomming Event!"
                }
            ]
        }
    };
    let yearnumber = msg.content.split(" ")[1];

    if (msg.content === "!help") {
        console.log(help);
        msg.author.send(help);
        msg.channel.send(msg.author + ", DM sent!");
    }
    if (msg.content === "!newest") {
        msg.channel.send("this is current banner at jp " + msg.author);
       allbanners(msg);
        

    }

    if (yearnumber != undefined && msg.content.split(" ")[0] === "!year") {
        msg.author.send("this is the entire list for this year " + msg.author);
      selectedBanner(msg, yearnumber);
        msg.channel.send(msg.author + ", DM sent!");

        
    }

    if (msg.content === "!next-banner") {
        msg.channel.send("This is the next banner " + msg.author);
        nextBanner(msg);
    }
    if (msg.content === "!next-event") {
        msg.channel.send("This is the next event " + msg.author);
        nextEvent(msg);
    }

});

client.on('ready', () => {
    console.log("bot is active");
    // client.channels.find(x => x.name === 'general').send("Hello");
});


function allbanners(msg) {


    let options = {
        host: 'fate-go.cirnopedia.org',
        path: '/summon.php'

    }
    let request = http.request(options, function (res) {
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {

            const dom = new JSDOM(data);
            // console.log(dom.window.document.getElementById("2019").innerHTML);
            let year = new Date().getFullYear().toString();
            let size = dom.window.document.getElementById(year).nextElementSibling.querySelectorAll('tr').length;
           
             
                    let text = dom.window.document.getElementById(year).nextElementSibling.getElementsByTagName('tr')[size-1].cells[0].textContent;
                    let image = "https://fate-go.cirnopedia.org/" + dom.window.document.getElementById(year).nextElementSibling.querySelectorAll('tr')[size-1].firstElementChild.firstElementChild.getAttribute('src');
                    
                    let content =
                    {
                        "embed": {
                            "image": {
                                "url": image
                            },
                            "description": text
                        }
                    };
                    msg.channel.send(content);
                
            
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();

}

//----------------------------------------------------------------------

function selectedBanner(msg, year) {

    let options = {
        host: 'fate-go.cirnopedia.org',
        path: '/summon.php'
    }

    let request = http.request(options, function (res) {
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {

            const dom = new JSDOM(data);
            // console.log(dom.window.document.getElementById("2019").innerHTML);

            let size = dom.window.document.getElementById(year).nextElementSibling.querySelectorAll('tr').length;
            for (let i = 1; i < size; i++) {
                setTimeout(function () {


                    let text = dom.window.document.getElementById(year).nextElementSibling.getElementsByTagName('tr')[i].cells[0].textContent;
                    let image = "https://fate-go.cirnopedia.org/" + dom.window.document.getElementById(year).nextElementSibling.querySelectorAll('tr')[i].firstElementChild.firstElementChild.getAttribute('src');
                    let content =
                    {
                        "embed": {
                            "image": {
                                "url": image
                            },
                            "description": text
                        }
                    };
                    msg.author.send(content);
                }, 3000 * i);

            }

        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();

}

//---------------------------------------------------------------------------------
function nextBanner(msg) {

    let options = {
        host: 'fate-go.cirnopedia.org',
        path: '/summon.php'
    }

    let request = http.request(options, function (res) {
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {

            const dom = new JSDOM(data);

            for (let year = 2017; year < 2020; year++) {


                let size = dom.window.document.getElementById(year.toString()).nextElementSibling.querySelectorAll('tr').length;
                for (let i = 1; i < size; i++) {
                    let text = dom.window.document.getElementById(year.toString()).nextElementSibling.getElementsByTagName('tr')[i].cells[0].textContent;
                    let image = "https://fate-go.cirnopedia.org/" + dom.window.document.getElementById(year.toString()).nextElementSibling.querySelectorAll('tr')[i].firstElementChild.firstElementChild.getAttribute('src');
                    let date = text.match("[0-9][0-9]/[0-9][0-9]");
                    let date1 = new Date(2019, ((new Number(date[0].split("/")[0])) - 1), new Number(date[0].split("/")[1]));
                    let date2 = new Date();
                    let timeToDate = (date1.getTime() - date2.getTime());
                    let timeLeft = new Date(timeToDate);  
                    let dateText = "This many days left untill this banner: " + Math.floor(timeLeft / 1000 / 60 / 60 / 24);
                    let content =
                    {
                        "embed": {
                            "image": {
                                "url": image,
                            },

                            "title": text,
                           "description" : dateText,
                            "color": 1127128

                        }
                    };

               

                    if (timeToDate > 0) {
                        msg.channel.send(content);

                        return;
                    }
                }
            }
        });
    });

    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();

}

function nextEvent(msg) {

    let options = {
        host: 'fate-go.cirnopedia.org',
        path: '/quest_event.php'
    }

    let request = http.request(options, function (res) {
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {

            const dom = new JSDOM(data);

            for (let year = 2017; year < 2020; year++) {


                let size = dom.window.document.getElementById(year.toString()).nextElementSibling.querySelectorAll('tr').length;
                for (let i = 1; i < size; i++) {
                    let text = dom.window.document.getElementById(year.toString()).nextElementSibling.getElementsByTagName('tr')[i].cells[0].textContent;
                    let link = "https://fate-go.cirnopedia.org/" + dom.window.document.getElementById(year.toString()).nextElementSibling.querySelectorAll('tr')[i].firstElementChild.firstElementChild.getAttribute('href');
                    let image = "https://fate-go.cirnopedia.org/" + dom.window.document.getElementById(year.toString()).nextElementSibling.querySelectorAll('tr')[i].firstElementChild.firstElementChild.firstElementChild.getAttribute('src');
                    let date = text.match("[0-9][0-9]/[0-9][0-9]");
                    let date1 = new Date(2019, ((new Number(date[0].split("/")[0])) - 1), new Number(date[0].split("/")[1]));
                    let date2 = new Date();
                    let timeToDate = (date1.getTime() - date2.getTime());
                    let timeLeft = new Date(timeToDate);
                    let dateText = "This many days left untill this event: " + Math.floor(timeLeft / 1000 / 60 / 60 / 24);
                  let content =
                      {
                        
                        "embed": {
                           "image": {
                                "url": image,
                            },
                           "color": 1127128,
                          
                          
                              
                            "title":text,
                            "url": link,
                            "description" : dateText
                            
                           
                          
                          
                        }
                    };

                 

                    if (timeToDate > 0) {
                        msg.channel.send(content);

                        return;
                    }
                }
            }
        });
    });

    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();

}








client.login(config.token);

