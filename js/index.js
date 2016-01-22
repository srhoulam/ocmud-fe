'use strict';

var socket = (function() {
    // UI
    // spin this off into its own module soon
    var ui = {
        raw : document.getElementById('raw'),
        desc : document.getElementById('desc'),
        exits : document.getElementById('exits'),
        log : document.getElementById('log')
    };

    function addToLog(info) {
        ui.log.textContent += info + '\n';
    }
    function displaySight(sight) {
        console.log(sight);

        ui.raw.textContent = JSON.stringify(sight);
        ui.desc.textContent = sight.desc;
        ui.exits.textContent = sight.exits;
    }

    // end UI

    // Socket
    // spin this off into a module exporting a set-up function
    var socket = io("http://localhost:3000");

    socket.on("info", addToLog);
    socket.on("numClients", num => console.log("numClients:", num.clients));
    socket.on("sight", displaySight);

    return socket;
})();
