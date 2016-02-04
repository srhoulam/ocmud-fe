'use strict';

var socket = {
    init : function initSocket(url) {
        api && api.quit && api.quit();

        var socket = io(url, {
            forceNew : true
        });

        socket.on("info", ui.methods.addToLog);

        socket.on("numClients", num => console.log("numClients:", num.clients));

        socket.on("travel", ui.methods.addToLog);
        socket.on("action", ui.methods.addToLog);

        socket.on("sight", ui.methods.displaySight);
        socket.on("speech", obj => console.log("Speech:", `<${obj.from}> ${obj.message}`));

        return socket;
    }
};
