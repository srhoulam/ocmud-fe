'use strict';

var ui = (function() {
    function genericSubmitterFactory(helper) {
        return function(e) {
            e.preventDefault();
            helper(e);
            return e.target.reset();
        };
    }
    function olfHelperFactory(executor) {
        return function(e) {
            reactViews.form.hide();
            executor(e);
            reactViews.form.setState(reactViews.form.getInitialState());
            return ui.methods.listenMain();
        };
    }
    var formStates = {
        say : {
            title : "Say what?",
            name : "message",
            description : "Enter what you want to say below.",
            placeholder : "I couldn't think of anything to say.",
            buttonTitle : "Say",
            submitHandler : genericSubmitterFactory(olfHelperFactory(function(e) {
                api.say(e.target.message.value);
            }))
        },
        write : {
            title : "Write what?",
            name : "text",
            description : "Enter what you want to write below.",
            placeholder : `Somebody was here.`,
            buttonTitle : "Write",
            submitHandler : genericSubmitterFactory(olfHelperFactory(function(e) {
                api.write(e.target.text.value);
            }))
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
            listenMain : function() {
                return document.addEventListener('keyup', ui.handlers.keyPressMain);
            },
            listenOLF : function() {
                return document.addEventListener('keyup', ui.handlers.keyPressOLF);
            },
            ignoreMain : function() {
                return document.removeEventListener('keyup', ui.handlers.keyPressMain);
            },
            ignoreOLF : function() {
                return document.removeEventListener('keyup', ui.handlers.keyPressOLF);
            }
        },
        handlers : {
            keyPressMain : function mainKeyCommand(event) {
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
                }
            },
            keyPressOLF : function olfKeyCommand(event) {
                var keyPressed = processKey(event.key || event.keyCode);

                switch(keyPressed.toLowerCase()) {
                    case 'escape':
                        ui.methods.ignoreOLF();
                        reactViews.form.hide();
                        reactViews.form.setState(reactViews.form.getInitialState());
                        ui.methods.listenMain();
                        break;
                }
            }
        },
        commands : {
            connect : function connect() {},
            create : function create() {},
            jump : function jumo() {},
            quit : function quit() {
                ui.methods.ignoreMain();
                reactViews.location.reset();
                reactViews.authForm.setDisabled(false);
                reactViews.authForm.show();

                return api.quit();
            },
            say : function say() {
                ui.methods.ignoreMain();
                reactViews.form.setState(formStates.say);
                reactViews.form.show();
                return ui.methods.listenOLF();
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
                ui.methods.ignoreMain();
                reactViews.form.setState(formStates.write);
                reactViews.form.show();
                return ui.methods.listenOLF();
            }
        }
    };
})();
