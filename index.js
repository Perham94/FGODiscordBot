const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const http = require('http');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

client.on('message', (msg) => {
    let help = {
        "embed": {
            "color": 2321651,
            "fields": [
                {
                    "name": "!newest",
                    "value": "Newest things that will appear in future."
                },
                {
                    "name": "!year {year}",
                    "value": "Writes all banner from chosen year."
                },
                {
                    "name": "!next",
                    "value": "Next upcomming Banner!"
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
        msg.channel.send("this is all the list " + msg.author);
        allbanners(msg);
    }

    if (yearnumber != undefined && msg.content.split(" ")[0] === "!year") {
        msg.channel.send("this is the entire list for this year " + msg.author);
        selectedBanner(msg, yearnumber);
    }

    if (msg.content === "!next") {
        msg.channel.send("This is the next banner " + msg.author);
        nextBanner(msg);
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
            let year = "2019";
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
                    msg.channel.send(content);
                }, 3000 * i);
            }
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
                    msg.channel.send(content);
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
                    let content =
                    {
                        "embed": {
                            "image": {
                                "url": image,
                            },

                            "title": text,
                            "color": 1127128

                        }
                    };

                    let date = text.match("[0-9][0-9]/[0-9][0-9]");
                    let date1 = new Date(2019, ((new Number(date[0].split("/")[0])) - 1), new Number(date[0].split("/")[1]));
                    let date2 = new Date();
                    let timeToDate = (date1.getTime() - date2.getTime());
                    let timeLeft = new Date(timeToDate);

                    if (timeToDate > 0) {
                        msg.channel.send(content);

                        msg.channel.send("This many days left: " + Math.floor(timeLeft / 1000 / 60 / 60 / 24));
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

