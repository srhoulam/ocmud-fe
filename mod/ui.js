'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('./react');

var _react2 = _interopRequireDefault(_react);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Api = undefined;

var ui = function () {
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
            placeholder: 'Somebody was here.',
            buttonTitle: "Write",
            submitHandler: genericSubmitterFactory(olfHelperFactory(function (e) {
                Api.write(e.target.text.value);
            }))
        }
    };
    var optionFormSubmitters = {
        jump: genericSubmitterFactory(optionHelperFactory(function (e) {
            Api.jump(e.target.choice.value);
        }))
    };
    var formStateFactories = {
        jump: function jump(choiceArray) {
            return {
                title: "Jump",
                description: "Instantly travel to one of your locations.",
                buttonTitle: "Jump",
                options: choiceArray,
                submitHandler: optionFormSubmitters.jump
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
                var keyPressed = processKey(event.key || event.keyCode);

                switch (keyPressed.toLowerCase()) {
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
            create: function create() {},
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
                var direction = undefined;

                switch (key) {
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
