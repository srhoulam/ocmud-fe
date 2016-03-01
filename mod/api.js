'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initApi(methods) {
    try {
        apiModule.api.quit();
    } catch (e) {
        //  no existing connection to terminate
    }

    var io = _socket2.default.init(_constants2.default.backendURL);

    var apiObject = {
        confirm: function confirm(code) {
            return io.emit('command', {
                command: 'confirmEmail',
                'code': code
            });
        },
        connect: function connect(direction, index) {
            return io.emit('command', {
                command: 'connect',
                'direction': direction,
                'index': index
            });
        },
        create: function create(direction, description) {
            return io.emit('command', {
                command: 'create',
                'direction': direction,
                'description': description
            });
        },
        go: function go(direction) {
            return io.emit('command', {
                command: 'travel',
                'direction': direction
            });
        },
        jump: function jump(index) {
            return io.emit('command', {
                command: 'jump',
                'index': index
            });
        },
        list: function list() {
            var p = new Promise(function listExec(res, rej) {
                var resolved = false;

                function onLoc(locs) {
                    resolved = true;
                    rmOnLoc();
                    return res(locs);
                }
                function rmOnLoc() {
                    io.removeListener('locations', onLoc);
                }

                io.on('locations', onLoc);
                setTimeout(function () {
                    if (!resolved) {
                        rmOnLoc();
                        return rej();
                    }
                }, 2500);
            });
            io.emit('command', {
                command: 'list'
            });

            return p;
        },
        look: function look() {
            return io.emit('command', {
                command: 'look'
            });
        },
        quit: function quit() {
            var result = io.emit('command', {
                command: 'quit'
            });

            io = null;

            return result;
        },
        resend: function resend() {
            return io.emit('command', {
                command: 'resendEmail'
            });
        },
        say: function say(message) {
            return io.emit('command', {
                command: 'say',
                'message': message
            });
        },
        whoami: function whoami() {
            return io.emit('command', {
                command: 'whoami'
            });
        },
        write: function write(text) {
            return io.emit('command', {
                command: 'write',
                message: text
            });
        }
    };

    apiModule.api = apiObject;

    return _socket2.default.configure(io, methods, apiObject);
}

var apiModule = {
    init: initApi,
    api: null
};

exports.default = apiModule;
//# sourceMappingURL=api.js.map
