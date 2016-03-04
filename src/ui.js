import react from './react';
import constants from './constants';
import api from './api';
import app from './app';
let Api;

var ui = (function() {
    let elements = {
        optionForm : document.getElementById("option-form")
    };

    function genericSubmitterFactory(helper) {
        return function(e) {
            e.preventDefault();
            helper(e);
            return e.target.reset();
        };
    }
    function olfHelperFactory(executor) {
        return function(e) {
            ui.methods.ignoreOLF();
            react.form.hide();
            executor(e);
            react.form.setState(react.form.getInitialState());
            return ui.methods.listenMain();
        };
    }
    function optionHelperFactory(executor) {
        return function(e) {
            ui.methods.ignoreOption();
            react.optionForm.hide();
            executor(e);
            react.optionForm.setState(react.optionForm.getInitialState());
            return ui.methods.listenMain();
        };
    }
    let formStates = {
        say : {
            title : "Say what?",
            name : "message",
            description : "Enter what you want to say below.",
            placeholder : "I couldn't think of anything to say.",
            buttonTitle : "Say",
            submitHandler : genericSubmitterFactory(olfHelperFactory(function(e) {
                Api.say(e.target.message.value);
            }))
        },
        write : {
            title : "Write what?",
            name : "text",
            description : "Enter what you want to write below.",
            placeholder : "Somebody was here.",
            buttonTitle : "Write",
            submitHandler : genericSubmitterFactory(olfHelperFactory(function(e) {
                Api.write(e.target.text.value);
            }))
        }
    };
    let optionFormSubmitters = {
        jump : genericSubmitterFactory(optionHelperFactory(function(e) {
            Api.jump(parseInt(e.target.location.value, 10));
        })),
        create : genericSubmitterFactory(function(e) {
            ui.methods.ignoreOption();
            react.optionForm.hide();

            let direction = e.target.direction.value;

            react.form.setState(
                formStateFactories.createDesc(
                    genericSubmitterFactory(function(e) {
                        ui.methods.ignoreOLF();
                        react.form.hide();
                        Api.create(direction, e.target.description.value);
                        react.form.setState(react.form.getInitialState());
                        ui.methods.listenMain();
                    })
                )
            );
            react.form.show();
            ui.methods.listenOLF();
            react.optionForm.setState(react.optionForm.getInitialState());
        })
    };
    let formStateFactories = {
        jump : function(choiceArray) {
            return {
                title : "Jump",
                description : "Instantly travel to one of your locations.",
                buttonTitle : "Jump",
                name : "location",
                options : choiceArray,
                submitHandler : optionFormSubmitters.jump
            };
        },
        create : function(exits) {
            return {
                title : "Create",
                description : "Where do you wish to create the new location?",
                buttonTitle : "Create",
                name : "direction",
                options : exits,
                submitHandler : optionFormSubmitters.create
            };
        },
        createDesc : function(submitHandler) {
            return {
                title : "Create",
                name : "description",
                description : "How would you describe the location you're creating?",
                placeholder : "The official place to not be.",
                buttonTitle : "Create",
                submitHandler
            };
        }
    };

    function ifLoggedIn(f) {
        if(app.loggedInAs !== false) {
            f();
        }
    }
    function complementLocalExits() {
        return constants.directionList.filter(function(dir) {
            //  get the complement of the current location's
            //      available exits
            return react.location.state.exits.indexOf(dir) === -1;
        });

    }
    function prepareExits(exits) {
        return exits.map(function(dir) {
            return {
                name : constants.directionNames[dir],
                value : dir
            };
        });
    }
    function processKey(code) {
        let result;

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

    let ui = {
        methods : {
            addToChatLog : function addToChat(message) {
                return react.chatLog.add(message);
            },
            addToInfoLog : function addToLog(type, info) {
                return react.infoLog.add({
                    'type' : type,
                    message : info
                });
            },
            ageMessages : function ageMessages() {
                react.chatLog.tick();
                return react.infoLog.tick();
            },
            displaySight : function displaySight(sight) {
                return react.location.setState(sight);
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
                return react.authForm.show();
            },
            listenMain : function() {
                return document.addEventListener('keyup', ui.handlers.keyPressMain);
            },
            listenOLF : function() {
                return document.addEventListener('keyup', ui.handlers.keyPressOLF);
            },
            listenOption : function() {
                return document.addEventListener('keyup', ui.handlers.keyPressOption);
            },
            ignoreMain : function() {
                return document.removeEventListener('keyup', ui.handlers.keyPressMain);
            },
            ignoreOLF : function() {
                return document.removeEventListener('keyup', ui.handlers.keyPressOLF);
            },
            ignoreOption : function() {
                return document.removeEventListener('keyup', ui.handlers.keyPressOption);
            }
        },
        handlers : {
            keyPressMain : function mainKeyCommand(event) {
                let keyPressed = processKey(event.key || event.keyCode);

                switch(keyPressed.toLowerCase()) {
                    case 'arrowleft':
                    case 'arrowright':
                    case 'arrowup':
                    case 'arrowdown':
                        ui.commands.travel(keyPressed);
                        break;
                    case 'escape':
                        console.log("escape");
                        break;
                    case 'c':
                        break;
                    case 'j':
                        ifLoggedIn(ui.commands.jump);
                        break;
                    case 'l':
                        Api.look();
                        break;
                    case 'm':
                        ifLoggedIn(ui.commands.create);
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
                let keyPressed = processKey(event.key || event.keyCode);

                switch(keyPressed.toLowerCase()) {
                    case 'escape':
                        ui.methods.ignoreOLF();
                        react.form.hide();
                        react.form.setState(react.form.getInitialState());
                        ui.methods.listenMain();
                        break;
                }
            },
            keyPressOption : function optionKeyCommand(event) {
                let keyPressed = processKey(event.key || event.keyCode).toLowerCase();

                switch(keyPressed) {
                    case 'arrowleft':
                    case 'arrowright':
                    case 'arrowup':
                    case 'arrowdown':
                        let choice = elements.optionForm.
                            querySelector(`input[value=${constants.directionArrows[keyPressed]}]`);
                        if(choice) {
                            choice.click();
                        } else if(keyPressed === 'arrowleft' || keyPressed === 'arrowright') {
                            let offset = keyPressed === 'arrowleft' ? -1 : 1;
                            let inputs = elements.optionForm.
                                querySelectorAll('input');
                            for(let index = 0; index < inputs.length; index++) {
                                if(inputs[index].checked) {
                                    inputs[index + offset % inputs.length].click();
                                    break;
                                }
                                if(index === inputs.length - 1) {
                                    inputs[0].click();
                                }
                            }
                        }

                        elements.optionForm.
                            querySelector("button[type=submit]").
                            focus();
                        break;
                    case 'escape':
                        ui.methods.ignoreOption();
                        react.optionForm.hide();
                        react.optionForm.setState(react.optionForm.getInitialState());
                        ui.methods.listenMain();
                        break;
                }
            }
        },
        commands : {
            connect : function connect() {},
            create : function create() {
                ui.methods.ignoreMain();
                react.optionForm.setState(
                    formStateFactories.create(
                        prepareExits(
                            complementLocalExits()
                        )
                    )
                );
                react.optionForm.show();
                return ui.methods.listenOption();
            },
            jump : function jump() {
                Api.list().then(function(locs) {
                    ui.methods.ignoreMain();
                    react.optionForm.setState(formStateFactories.jump(locs));
                    react.optionForm.show();
                    return ui.methods.listenOption();
                });
            },
            quit : function quit() {
                ui.methods.ignoreMain();
                react.location.reset();
                react.authForm.setDisabled(false);
                react.authForm.show();

                return Api.quit();
            },
            say : function say() {
                ui.methods.ignoreMain();
                react.form.setState(formStates.say);
                react.form.show();
                return ui.methods.listenOLF();
            },
            travel : function travel(key) {
                let direction = constants.directionArrows[key];

                if(!direction) {
                    return;
                }

                Api.go(direction);
            },
            write : function write() {
                ui.methods.ignoreMain();
                react.form.setState(formStates.write);
                react.form.show();
                return ui.methods.listenOLF();
            }
        }
    };

    // resolve circular dependency
    let initApi = api.init;
    api.init = function() {
        initApi(ui.methods);
        Api = api.api;
        ui.methods.listenMain();
    };

    return ui;
})();

export default ui;