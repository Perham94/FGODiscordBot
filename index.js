const http = require('http');




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

    let summonOptions = {
        host: 'fate-go.cirnopedia.org',
        path: '/summon.php'
    }
    let eventOptions = {
        host: 'fate-go.cirnopedia.org',
        path: '/quest_event.php'
    }

    let yearnumber = msg.content.split(" ")[1];

    if (msg.content === "!help") {
        console.log(help);
        msg.channel.send(help);

    }


    if (yearnumber != undefined && msg.content.split(" ")[0] === "!year") {
        msg.author.send("this is the entire list for the current " + yearnumber);
        selectedBanner(msg, yearnumber, summonOptions);
        msg.channel.send(msg.author + ", DM sent!");


    }

    if (msg.content === "!next-banner") {
        msg.channel.send("This is the next banner " + msg.author);
        nextBanner(msg, summonOptions);
    }
    if (msg.content === "!next-event") {
        msg.channel.send("This is the next event " + msg.author);
        nextEvent(msg, eventOptions);
    }

});

client.on('ready', () => {
    console.log("bot is active");

});





//----------------------------------------------------------------------

function selectedBanner(msg, year, options) {



    let request = http.request(options, function (res) {
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {

            const dom = new JSDOM(data);

            let targetEle = dom.window.document.getElementById(year).nextElementSibling.querySelectorAll('tr');
            let size = targetEle.length;
            for (let i = 1; i < size; i++) {
                setTimeout(function () {
                    let text = targetEle[i].cells[0].textContent;
                    let path = targetEle[i].cells[0].firstChild.getAttribute("src");
                    let image = "https://fate-go.cirnopedia.org/" + path;


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
function nextBanner(msg, options) {
    // check ping time start console.log(Date.now());


    let request = http.request(options, function (res) {
        let data = '';

        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {

            const dom = new JSDOM(data);

            for (let year = 2017; year < 2020; year++) {
                year = year.toString();
                let targetEle = dom.window.document.getElementById(year).nextElementSibling.querySelectorAll('tr');
                let size = targetEle.length;

                for (let i = 1; i < size; i++) {
                    let text = targetEle[i].cells[0].textContent;
                    let path = targetEle[i].cells[0].firstChild.getAttribute("src");
                    let image = "https://fate-go.cirnopedia.org/" + path;
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
                            "description": dateText,
                            "color": 1127128

                        }
                    };



                    if (timeToDate > 0) {

                        //check ping time end  console.log(Date.now());

                        return msg.channel.send(content);
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

function nextEvent(msg, options) {

    let request = http.request(options, function (res) {
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {

            const dom = new JSDOM(data);

            for (let year = 2017; year < 2020; year++) {
                year = year.toString();
                let targetEle = dom.window.document.getElementById(year).nextElementSibling.querySelectorAll('tr');
                let size = targetEle.length;

                for (let i = 1; i < size; i++) {
                    let text = targetEle[i].cells[0].textContent;
                    let path = targetEle[i].cells[0].firstChild.firstChild.getAttribute("src");
                    let secoundPath = targetEle[i].cells[0].firstChild.getAttribute("href");
                    let link = "https://fate-go.cirnopedia.org/" + secoundPath;
                    let image = "https://fate-go.cirnopedia.org/" + path;
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



                            "title": text,
                            "url": link,
                            "description": dateText




                        }
                    };



                    if (timeToDate > 0) {


                        return msg.channel.send(content);
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
client.login("Client_ID");

