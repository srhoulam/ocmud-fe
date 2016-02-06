'use strict';

var socket = {
    init : function initSocket(url) {
        try {
            api.quit();
        } catch(error) {
            // no existing connection to terminate
        }

        var socket = io(url, {
            forceNew : true
        });

        socket.on("connect", function() {
            console.log("Connected.");
        });
        socket.on("disconnect", function() {
            console.log("Disconnected.");
        });

        socket.on("info", ui.methods.addToLog);

        socket.on("numClients", num => console.log("numClients:", num.clients));

        socket.on("travel", ui.methods.addToLog);
        socket.on("action", ui.methods.addToLog);
        socket.on("locations", ui.methods.addToLog);

        socket.on("sight", ui.methods.displaySight);
        socket.on("speech", obj => console.log("Speech:", `<${obj.from}> ${obj.message}`));

        return socket;
    }
};
