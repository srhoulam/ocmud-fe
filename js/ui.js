'use strict';

var ui = {
    elements : {
        raw : document.getElementById('raw'),
        name : document.getElementById('name'),
        desc : document.getElementById('desc'),
        exits : document.getElementById('exits'),
        log : document.getElementById('log')
    },
    methods : {
        addToLog : function addToLog(info) {
            ui.elements.log.textContent += info + '\n';
        },
        displaySight : function displaySight(sight) {
            ui.elements.raw.textContent = JSON.stringify(sight);
            ui.elements.name.textContent = sight.name;
            ui.elements.desc.textContent = sight.desc;
            ui.elements.exits.textContent = sight.exits;
        }
    }
};


