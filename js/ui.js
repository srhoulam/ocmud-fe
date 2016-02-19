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
                reactViews.form.setState(reactViews.form.getInitialState());
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
                reactViews.form.setState(reactViews.form.getInitialState());
                ui.methods.beginListening();
            }
        }
    };

    function processKey(code) {
        var result;

        if(Number.isFinite(code)) {
            // Chrome
            switch(code) {
                case 27:
                    result = "escape";
                    break;
                case 37:
                    result = "arrowleft";
                    break;
                case 38:
                    result = "arrowup";
                    break;
                case 39:
                    result = "arrowright";
                    break;
                case 40:
                    result = "arrowdown";
                    break;
                default:
                    result = String.fromCharCode(code);
                    break;
            }
        } else {
            // Firefox
            result = code;
        }

        return result.toLowerCase();
    }

    return {
        elements : {
            auth : document.getElementById('auth'),
            explore : document.querySelector("button[type=button]")
        },
        methods : {
            addToChatLog : function addToChat(message) {
                return reactViews.chatLog.add(message);
            },
            addToInfoLog : function addToLog(type, info) {
                return reactViews.infoLog.add({
                    'type' : type,
                    message : info
                });
            },
            ageMessages : function ageMessages() {
                reactViews.chatLog.tick();
                return reactViews.infoLog.tick();
            },
            beginListening : function() {
                return document.addEventListener('keyup', ui.handlers.keyPress);
            },
            displaySight : function displaySight(sight) {
                return reactViews.location.setState(sight);
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
                return reactViews.authForm.show();
            },
            stopListening : function() {
                return document.removeEventListener('keyup', ui.handlers.keyPress);
            }
        },
        handlers : {
            keyPress : function keyCommand(event) {
                var keyPressed = processKey(event.key || event.keyCode);

                switch(keyPressed.toLowerCase()) {
                    case 'arrowleft':
                    case 'arrowright':
                    case 'arrowup':
                    case 'arrowdown':
                        ui.commands.travel(keyPressed);
                        break;
                    case 'escape':
                        console.log('escape');
                        break;
                    case 'c':
                        break;
                    case 'j':
                        break;
                    case 'l':
                        api.look();
                        break;
                    case 'm':
                        break;
                    case 'q':
                        ui.commands.quit();
                        break;
                    case 's':
                        ui.commands.say();
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
                return reactViews.form.show();
            },
            travel : function travel(key) {
                var direction;

                switch(key) {
                    case 'arrowleft':
                        direction = 'w';
                        break;
                    case 'arrowright':
                        direction = 'e';
                        break;
                    case 'arrowup':
                        direction = 'n';
                        break;
                    case 'arrowdown':
                        direction = 's';
                        break;
                }

                if(!direction) {
                    return;
                }

                api.go(direction);
            },
            write : function write() {
                ui.methods.stopListening();
                reactViews.form.setState(formStates.write);
                return reactViews.form.show();
            }
        }
    };
})();
