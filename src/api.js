import socket from './socket';
import constants from './constants';

function initApi(methods) {
    try {
        apiModule.api.quit();
    } catch(e) {
        //  no existing connection to terminate
    }

    let io = socket.init(constants.backendURL);

    let apiObject = {
        confirm : function confirm(code) {
            return io.emit('command', {
                command : 'confirmEmail',
                'code' : code
            });
        },
        connect : function connect(direction, index) {
            return io.emit('command', {
                command : 'connect',
                'direction' : direction,
                'index' : index
            });
        },
        create : function create(direction, description) {
            return io.emit('command', {
                command : 'create',
                'direction' : direction,
                'description' : description
            });
        },
        go : function go(direction) {
            return io.emit('command', {
                command : 'travel',
                'direction' : direction
            });
        },
        jump : function jump(index) {
            return io.emit('command', {
                command : 'jump',
                'index' : index
            });
        },
        list : function list() {
            let p = new Promise(function listExec(res, rej) {
                let resolved = false;

                io.on('locations', function(locs) {
                    resolved = true;
                    return res(locs);
                });
                setTimeout(function() {
                    if(!resolved) {
                        return rej();
                    }
                }, 2500);
            });
            io.emit('command', {
                command : 'list'
            });

            return p;
        },
        look : function look() {
            return io.emit('command', {
                command : 'look'
            });
        },
        quit : function quit() {
            let result = io.emit('command', {
                command : 'quit'
            });

            io = null;

            return result;
        },
        resend : function resend() {
            return io.emit('command', {
                command : 'resendEmail'
            });
        },
        say : function say(message) {
            return io.emit('command', {
                command : 'say',
                'message' : message
            });
        },
        whoami : function whoami() {
            return io.emit('command', {
                command : 'whoami'
            });
        },
        write : function write(text) {
            return io.emit('command', {
                command : 'write',
                message : text
            });
        }
    };

    apiModule.api = apiObject;

    return socket.configure(io, methods, apiObject);
}

let apiModule = {
    init : initApi,
    api : null
};

export default apiModule;
