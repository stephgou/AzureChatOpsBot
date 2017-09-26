'use strict';
var restify = require('restify');
var builder = require('botbuilder');
var script = require("./index.js");



//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//var bot = new builder.UniversalBot(connector);
var bot = new builder.UniversalBot(connector, function (session) {
    session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
});
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Global Actions
//=========================================================

// bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });

// bot.beginDialogAction('help', '/help', { matches: /^help/i });
// bot.beginDialogAction('reset', '/reset', { matches: /^reset/i });

//=========================================================
// Bots Dialogs
//=========================================================

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/371e5058-5522-44c7-9fce-759c19b7ff9a?subscription-key=cbf1bd099b9e40aa865124d487346e04&timezoneOffset=0&verbose=true&q=';
var recognizer = new builder.LuisRecognizer(model);
bot.recognizer(recognizer);

var intents = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('Create', [
    function (session, args, next) {
        //session.send('Create - We are analyzing your message: \'%s\'', session.message.text);
        // try extracting entities

        var serviceType = builder.EntityRecognizer.findEntity(args.intent.entities,'SERVICE-TYPE');
        if (serviceType) {
            // serviceType entity detected, continue to next step
            serviceTypeEntity = serviceType.entity;

            //session.send(serviceTypeEntity, session.message.text);


            if (serviceTypeEntity.trim()== 'vm') {
                
                var osName = builder.EntityRecognizer.findEntity(args.intent.entities,'OS-NAME');
                if (osName) {
                    // serviceType entity detected, continue to next step
                    session.send(osName.entity, session.message.text);
                }
                else {
                    builder.Prompts.text(session, "Quel Système d'exploitation ?");
                }                               
            }
            else if (serviceTypeEntity.trim()== 'appservice') {
                session.send('appservice', session.message.text);
                
            }
            else if (serviceTypeEntity.trim()== 'sqldatabase') {
                
            }                   
        }
        session.endDialog();
    }
]).triggerAction({
    matches: 'Create',
    onInterrupted: function (session) {
        session.send('Interruption Create');
    }
});

bot.dialog('Hello', [
    function (session, args, next) {
        session.send('Bonjour, je suis Chatops, et espère que tu passe une journée fantastique. Je peux t\'aider à utiliser azure; tape \' aide \' pour avoir toutes mes fonctionnalités ', session.message.text);
        // try extracting entities

        // End
        session.endDialog();
    }
]).triggerAction({
    matches: 'Hello',
    onInterrupted: function (session) {
        session.send('Interruption Stop');
    }
});

bot.dialog('insulte', [
    function (session, args, next) {
        session.send('Désolé de t\'avoir énervé, et de ne pouvoir faire de concours d\'insulte. Demande à mon créateur des bots qui soient dans ce registre, si tu veux. ', session.message.text);
        // try extracting entities

        // End
        session.endDialog();
    }
]).triggerAction({
    matches: 'insulte',
    onInterrupted: function (session) {
        session.send('Interruption Stop');
    }
});


bot.dialog('help', [
    function (session, args, next) {
        session.send('Je peux créer des services, les (re)démarrer, les arrêter ou te les lister. Tape \'liste-moi mes VM \' pour commencer', session.message.text);
        // try extracting entities

        // End
        session.endDialog();
    }
]).triggerAction({
    matches: 'help',
    onInterrupted: function (session) {
        session.send('Interruption Stop');
    }
});

bot.dialog('Stop', [
    function (session, args, next) {
        session.send('Stop - We are analyzing your message: \'%s\'', session.message.text);
        // try extracting entities

        // End
        session.endDialog();
    }
]).triggerAction({
    matches: 'Stop',
    onInterrupted: function (session) {
        session.send('Interruption Stop');
    }
});

bot.dialog('Start', [
    function (session, args, next) {
        session.send('Start - We are analyzing your message: \'%s\'', session.message.text);
        // try extracting entities

        // End
        session.endDialog();
    }
]).triggerAction({
    matches: 'Start',
    onInterrupted: function (session) {
        session.send('Interruption Start');
    }
});

bot.dialog('Restart', [
    function (session, args, next) {
        session.send('Restart - We are analyzing your message: \'%s\'', session.message.text);
        // try extracting entities

        // End
        session.endDialog();
    }
]).triggerAction({
    matches: 'Restart',
    onInterrupted: function (session) {
        session.send('Interruption Restart');
    }
});


bot.dialog('Test', [
    function (session, args, next) {
        session.send('Test - We are analyzing your message: \'%s\'', session.message.text);
        // try extracting entities

        // End
        session.endDialog();
    }
]).triggerAction({
    matches: 'Test',
    onInterrupted: function (session) {
        session.send('Interruption Test');
    }
});

bot.dialog('List', [
    function (session, args, next) {
        session.send('List - We understood you wanted to list: \'%s\'', session.message.text);
        // try extracting entities
        //console.log("tu es sous le session send",script.listVMs());
        script.listVMs(function(err,text){
            //console.log(text);
            //console.log("trying to read the json",text[1]["name"]);
            var output= readNames(text);

            console.log("parsed");
            //console.log(output);
            session.send(output);
        });
        //session.send(script.listVMs());
        // End
        session.endDialog();
    }
]).triggerAction({
    matches: 'List',
    onInterrupted: function (session) {
        session.send('Interruption List');
    }
});

intents.onDefault(builder.DialogAction.send("Je ne comprends pas !"));

function readNames (string){
    //dict = JSON.parse(string);
    var result="";
    for (var i in string){
        result+=", ";
        result+=string[i]["name"];
    
    }
    return result;
}

//=========================================================
// Bots Dialogs
//=========================================================

// bot.dialog('/', [
//     function (session, args, next) {
//         if (!session.userData.name) {
//             session.beginDialog('/profile');
//         } else {
//             next();
//         }
//     },
//     function (session, results, next) {
//         session.send('Hello %s!', session.userData.name);
// 				session.send('Comment puis-je vous aider?');
// 				session.beginDialog('/cortana');
//     }
// ]);


// bot.dialog('/profile', [
// 		function (session) {
//         session.beginDialog('/picture');
//     },
//     function (session) {
//         builder.Prompts.text(session, "Hello... What's your name?");
//     },
//     function (session, results) {
//         session.userData.name = results.response;
//         builder.Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?");
//     },
//     function (session, results) {
//         session.userData.coding = results.response;
//         builder.Prompts.choice(session, "What language do you code Node using?", ["JavaScript", "CoffeeScript", "TypeScript"]);
//     },
//     function (session, results) {
//         session.userData.language = results.response.entity;
//         session.send("Got it... " + session.userData.name +
//             " you've been programming for " + session.userData.coding +
//             " years and use " + session.userData.language + ".");
//         session.endDialog();
//     }
// ]);



// bot.dialog('/picture', [
//     function (session) {
//         var msg = new builder.Message(session)
//             .attachments([{
//                 contentType: "image/jpeg",
//                 contentUrl: "http://www.theoldrobots.com/images62/Bender-18.JPG"
//             }]);
//         session.endDialog(msg);
//     }
// ]);

// bot.dialog('/cortana', intents);

// bot.dialog('/help', [
//     function (session) {
//         session.endDialog("Global commands that are available anytime:\n\n* goodbye - End this conversation.\n* help - Displays these commands.");
//     }
// ]);

// bot.dialog('/reset', [
//     function (session) {
//         session.userData.name = null;
//         session.send('I have reset the profile.');
//         session.endDialog();
//     }
// ]);