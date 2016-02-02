'use strict';

var socket = {
    init : function initSocket(url) {
        var socket = io(url);

        socket.on("info", ui.methods.addToLog);
        socket.on("error", ui.methods.addToLog);

        socket.on("numClients", num => console.log("numClients:", num.clients));

        socket.on("travel", ui.methods.addToLog);
        socket.on("action", ui.methods.addToLog);

        socket.on("sight", ui.methods.displaySight);
        socket.on("speech", obj => console.log("Speech:", `<${obj.from}> ${obj.message}`));

        return socket;
    }
};
