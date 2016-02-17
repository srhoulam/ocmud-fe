'use strict';

var ui = (function() {
    var formStates = {
        say : {
            title : "Say what?",
            description : "Enter what you want to say below.",
            placeholder : "I couldn't think of anything to say.",
            buttonTitle : "Say",
            submitHandler : function submitSay(e) {
                e.preventDefault();
                reactViews.form.hide();
                ui.methods.beginListening();
            }
        },
        write : {
            title : "Write what?",
            description : "Enter what you want to write below.",
            placeholder : `Somebody was here.`,
            buttonTitle : "Write",
            submitHandler : function submitWrite(e) {
                e.preventDefault();
                reactViews.form.hide();
                ui.methods.beginListening();
            }
        }
    };

    return {
        elements : {
            auth : document.getElementById('auth'),
            explore : document.querySelector("button[type=button]")
        },
        methods : {
            addToChatLog : function addToChat(message) {
                reactViews.chatLog.add(message);
            },
            addToInfoLog : function addToLog(type, info) {
                reactViews.infoLog.add({
                    'type' : type,
                    message : info
                });
            },
            ageMessages : function ageMessages() {
                reactViews.infoLog.tick();
            },
            beginListening : function() {
                document.addEventListener('keypress', ui.handlers.keyPress);
            },
            displaySight : function displaySight(sight) {
                reactViews.location.setState(sight);
            },
            handleTravel : function handleTravel(info) {
                if(info === true) {
                    ui.methods.ageMessages();
                } else if(info !== false) {
                    //  not a boolean
                    ui.methods.addToInfoLog('travel', info);
                }
            },
            init : function uiInit() {
                reactViews.authForm.show();
            },
            stopListening : function() {
                document.removeEventListener('keypress', ui.handlers.keyPress);
            }
        },
        handlers : {
            keyPress : function keyCommand(event) {
                var keyPressed = event.key || event.keyCode;

                switch(keyPressed.toLowerCase()) {
                    case 'arrowleft':
                    case 'arrowright':
                    case 'arrowup':
                    case 'arrowdown':
                        console.log('travel');
                        break;
                    case 'escape':
                        console.log('escape');
                        break;
                    case 'c':
                        break;
                    case 'j':
                        break;
                    case 'l':
                        break;
                    case 'm':
                        break;
                    case 'q':
                        ui.commands.quit();
                        break;
                    case 's':
                        ui.commands.say();
                        break;
                    case 'v':
                        break;
                    case 'w':
                        ui.commands.write();
                        break;
                    default:
                        console.log("something else");
                        break;
                }
            }
        },
        commands : {
            connect : function connect() {},
            create : function create() {},
            jump : function jumo() {},
            list : function list() {},
            look : function look() {},
            quit : function quit() {
                ui.methods.stopListening();
                reactViews.location.reset();
                reactViews.authForm.setDisabled(false);
                reactViews.authForm.show();

                return api.quit();
            },
            say : function say() {
                ui.methods.stopListening();
                reactViews.form.setState(formStates.say);
                reactViews.form.show();
            },
            write : function write() {
                ui.methods.stopListening();
                reactViews.form.setState(formStates.write);
                reactViews.form.show();
            }
        }
    };
})();
