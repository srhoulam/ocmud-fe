'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('./react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Api = undefined;

var ui = function () {
    var elements = {
        optionForm: document.getElementById("option-form")
    };

    function genericSubmitterFactory(helper) {
        return function (e) {
            e.preventDefault();
            helper(e);
            return e.target.reset();
        };
    }
    function olfHelperFactory(executor) {
        return function (e) {
            ui.methods.ignoreOLF();
            _react2.default.form.hide();
            executor(e);
            _react2.default.form.setState(_react2.default.form.getInitialState());
            return ui.methods.listenMain();
        };
    }
    function optionHelperFactory(executor) {
        return function (e) {
            ui.methods.ignoreOption();
            _react2.default.optionForm.hide();
            executor(e);
            _react2.default.optionForm.setState(_react2.default.optionForm.getInitialState());
            return ui.methods.listenMain();
        };
    }
    var formStates = {
        say: {
            title: "Say what?",
            name: "message",
            description: "Enter what you want to say below.",
            placeholder: "I couldn't think of anything to say.",
            buttonTitle: "Say",
            submitHandler: genericSubmitterFactory(olfHelperFactory(function (e) {
                Api.say(e.target.message.value);
            }))
        },
        write: {
            title: "Write what?",
            name: "text",
            description: "Enter what you want to write below.",
            placeholder: "Somebody was here.",
            buttonTitle: "Write",
            submitHandler: genericSubmitterFactory(olfHelperFactory(function (e) {
                Api.write(e.target.text.value);
            }))
        }
    };
    var optionFormSubmitters = {
        jump: genericSubmitterFactory(optionHelperFactory(function (e) {
            Api.jump(parseInt(e.target.location.value, 10));
        })),
        create: genericSubmitterFactory(function (e) {
            ui.methods.ignoreOption();
            _react2.default.optionForm.hide();

            var direction = e.target.direction.value;

            _react2.default.form.setState(formStateFactories.createDesc(genericSubmitterFactory(function (e) {
                ui.methods.ignoreOLF();
                _react2.default.form.hide();
                Api.create(direction, e.target.description.value);
                _react2.default.form.setState(_react2.default.form.getInitialState());
                ui.methods.listenMain();
            })));
            _react2.default.form.show();
            ui.methods.listenOLF();
            _react2.default.optionForm.setState(_react2.default.optionForm.getInitialState());
        })
    };
    var formStateFactories = {
        jump: function jump(choiceArray) {
            return {
                title: "Jump",
                description: "Instantly travel to one of your locations.",
                buttonTitle: "Jump",
                name: "location",
                options: choiceArray,
                submitHandler: optionFormSubmitters.jump
            };
        },
        create: function create(exits) {
            return {
                title: "Create",
                description: "Where do you wish to create the new location?",
                buttonTitle: "Create",
                name: "direction",
                options: exits,
                submitHandler: optionFormSubmitters.create
            };
        },
        createDesc: function createDesc(submitHandler) {
            return {
                title: "Create",
                name: "description",
                description: "How would you describe the location you're creating?",
                placeholder: "The official place to not be.",
                buttonTitle: "Create",
                submitHandler: submitHandler
            };
        }
    };

    function ifLoggedIn(f) {
        if (_app2.default.loggedInAs !== false) {
            f();
        }
    }
    function processKey(code) {
        var result = undefined;

        if (Number.isFinite(code)) {
            // Chrome
            switch (code) {
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

    var ui = {
        methods: {
            addToChatLog: function addToChat(message) {
                return _react2.default.chatLog.add(message);
            },
            addToInfoLog: function addToLog(type, info) {
                return _react2.default.infoLog.add({
                    'type': type,
                    message: info
                });
            },
            ageMessages: function ageMessages() {
                _react2.default.chatLog.tick();
                return _react2.default.infoLog.tick();
            },
            displaySight: function displaySight(sight) {
                return _react2.default.location.setState(sight);
            },
            handleTravel: function handleTravel(info) {
                if (info === true) {
                    ui.methods.ageMessages();
                } else if (info !== false) {
                    //  not a boolean
                    ui.methods.addToInfoLog('travel', info);
                }
            },
            init: function uiInit() {
                return _react2.default.authForm.show();
            },
            listenMain: function listenMain() {
                return document.addEventListener('keyup', ui.handlers.keyPressMain);
            },
            listenOLF: function listenOLF() {
                return document.addEventListener('keyup', ui.handlers.keyPressOLF);
            },
            listenOption: function listenOption() {
                return document.addEventListener('keyup', ui.handlers.keyPressOption);
            },
            ignoreMain: function ignoreMain() {
                return document.removeEventListener('keyup', ui.handlers.keyPressMain);
            },
            ignoreOLF: function ignoreOLF() {
                return document.removeEventListener('keyup', ui.handlers.keyPressOLF);
            },
            ignoreOption: function ignoreOption() {
                return document.removeEventListener('keyup', ui.handlers.keyPressOption);
            }
        },
        handlers: {
            keyPressMain: function mainKeyCommand(event) {
                var keyPressed = processKey(event.key || event.keyCode);

                switch (keyPressed.toLowerCase()) {
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
            keyPressOLF: function olfKeyCommand(event) {
                var keyPressed = processKey(event.key || event.keyCode);

                switch (keyPressed.toLowerCase()) {
                    case 'escape':
                        ui.methods.ignoreOLF();
                        _react2.default.form.hide();
                        _react2.default.form.setState(_react2.default.form.getInitialState());
                        ui.methods.listenMain();
                        break;
                }
            },
            keyPressOption: function optionKeyCommand(event) {
                var keyPressed = processKey(event.key || event.keyCode).toLowerCase();

                switch (keyPressed) {
                    case 'arrowleft':
                    case 'arrowright':
                    case 'arrowup':
                    case 'arrowdown':
                        var choice = elements.optionForm.querySelector('input[value=' + _constants2.default.directionArrows[keyPressed] + ']');
                        if (choice) {
                            choice.click();
                        } else if (keyPressed === 'arrowleft' || keyPressed === 'arrowright') {
                            var offset = keyPressed === 'arrowleft' ? -1 : 1;
                            var inputs = elements.optionForm.querySelectorAll('input');
                            for (var index = 0; index < inputs.length; index++) {
                                if (inputs[index].checked) {
                                    inputs[index + offset % inputs.length].click();
                                    break;
                                }
                                if (index === inputs.length - 1) {
                                    inputs[0].click();
                                }
                            }
                        }

                        elements.optionForm.querySelector("button[type=submit]").focus();
                        break;
                    case 'escape':
                        ui.methods.ignoreOption();
                        _react2.default.optionForm.hide();
                        _react2.default.optionForm.setState(_react2.default.optionForm.getInitialState());
                        ui.methods.listenMain();
                        break;
                }
            }
        },
        commands: {
            connect: function connect() {},
            create: function create() {
                ui.methods.ignoreMain();
                _react2.default.optionForm.setState(formStateFactories.create(_constants2.default.directionList.filter(function (dir) {
                    //  get the complement of the current location's
                    //      available exits
                    return _react2.default.location.state.exits.indexOf(dir) === -1;
                }).map(function (dir) {
                    return {
                        name: _constants2.default.directionNames[dir],
                        value: dir
                    };
                })));
                _react2.default.optionForm.show();
                return ui.methods.listenOption();
            },
            jump: function jump() {
                Api.list().then(function (locs) {
                    ui.methods.ignoreMain();
                    _react2.default.optionForm.setState(formStateFactories.jump(locs));
                    _react2.default.optionForm.show();
                    return ui.methods.listenOption();
                });
            },
            quit: function quit() {
                ui.methods.ignoreMain();
                _react2.default.location.reset();
                _react2.default.authForm.setDisabled(false);
                _react2.default.authForm.show();

                return Api.quit();
            },
            say: function say() {
                ui.methods.ignoreMain();
                _react2.default.form.setState(formStates.say);
                _react2.default.form.show();
                return ui.methods.listenOLF();
            },
            travel: function travel(key) {
                var direction = _constants2.default.directionArrows[key];

                if (!direction) {
                    return;
                }

                Api.go(direction);
            },
            write: function write() {
                ui.methods.ignoreMain();
                _react2.default.form.setState(formStates.write);
                _react2.default.form.show();
                return ui.methods.listenOLF();
            }
        }
    };

    // resolve circular dependency
    var initApi = _api2.default.init;
    _api2.default.init = function () {
        initApi(ui.methods);
        Api = _api2.default.api;
        ui.methods.listenMain();
    };

    return ui;
}();

exports.default = ui;
//# sourceMappingURL=ui.js.map
