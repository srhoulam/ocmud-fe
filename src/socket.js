import app from './app';

export default {
    init : function initSocket(url) {
        return io(url, {
            forceNew : true
        });
    },
    configure : function(socket, methods, api) {
        //  yes, this is actually necessary
        function detectDowngrade() {
            console.log("detectDowngrade");
            socket.removeListener('connect', detectDowngrade);
            socket.on('ident', (function(intervalId) {
                return function onIdent(id) {
                    if(id !== app.loggedInAs) {
                        app.loggedInAs = id;

                        if(id === false) {
                            console.log("Reconnected and downgraded to explore mode.");
                        }
                    }

                    socket.removeListener('ident', onIdent);
                    clearInterval(intervalId);
                };
            })(setInterval(api.whoami, 500)));
        }

        socket.on("connect", function() {
            console.log("Connected.");
            api.look();
        });
        socket.on("disconnect", function() {
            console.log("Disconnected.");

            if(app.loggedInAs !== false) {
                socket.on('connect', detectDowngrade);
            }
        });

        socket.on("info", function(info) {
            methods.addToInfoLog('info', info);
        });

        socket.on("numClients", num => console.log("numClients:", num.clients));

        socket.on("travel", methods.handleTravel);
        socket.on("action", function(info) {
            if(info === true) {
                api.look();
            } else {
                methods.addToInfoLog('action', info);
            }
        });
        // socket.on("locations", function(locs) {
        //     methods.addToInfoLog('locations', locs);
        // });

        socket.on("sight", methods.displaySight);
        socket.on("speech", methods.addToChatLog);
    }
};
