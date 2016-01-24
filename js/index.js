'use strict';

var backendURL = "http://localhost:3000";

function init() {
    return socket.init(backendURL);
}

ui.methods.applyHandlers();
