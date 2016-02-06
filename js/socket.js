'use strict';

var socket = {
    init : function initSocket(url) {
        try {
            api.quit();
        } catch(error) {
            //  no existing connection to terminate
        }

        var socket = io(url, {
            forceNew : true
        });

        //  yes, this is actually necessary
        function detectDowngrade() {
            console.log("detectDowngrade");
            socket.removeListener('connect', detectDowngrade);
            socket.on('ident', (function(intervalId) {
                return function onIdent(id) {
                    console.log("onIdent");

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
        });
        socket.on("disconnect", function() {
            console.log("Disconnected.");

            if(app.loggedInAs !== false) {
                socket.on('ident', onIdent);
                socket.on('connect', detectDowngrade);
            }
        });

        socket.on("info", function(info) {
            ui.methods.addToLog('info', info);
        });

        socket.on("numClients", num => console.log("numClients:", num.clients));

        socket.on("travel", ui.methods.handleTravel);
        socket.on("action", function(info) {
            ui.methods.addToLog('action', info);
        });
        socket.on("locations", function(locs) {
            ui.methods.addToLog('locations', locs);
        });

        socket.on("sight", ui.methods.displaySight);
        socket.on("speech", obj => console.log("Speech:", `<${obj.from}> ${obj.message}`));

        return socket;
    }
};
