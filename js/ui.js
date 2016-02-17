'use strict';

var ui = (function() {
    var formStates = {
        write : {
            title : "Write what?",
            description : "Enter what you want to write below.",
            placeholder : `Somebody was here.`,
            buttonTitle : "Write",
            submitHandler : function submitWrite(e) {
                e.preventDefault();
                reactViews.form.hide();
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
                reactViews.location.reset();
                reactViews.authForm.setDisabled(false);
                reactViews.authForm.show();
                ui.methods.stopListening();

                return api.quit();
            },
            say : function say() {},
            write : function write() {
                reactViews.form.setState(formStates.write);
                reactViews.form.show();
            }
        }
    };
})();
