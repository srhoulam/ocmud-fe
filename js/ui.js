'use strict';

var ui = {
    elements : {
        raw : document.getElementById('raw'),
        name : document.getElementById('name'),
        desc : document.getElementById('desc'),
        exits : document.getElementById('exits'),
        log : document.getElementById('log'),
        auth : document.getElementById('auth')
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
        },
        applyHandlers : function applyHandlers() {
            ui.elements.auth.addEventListener('submit', ui.handlers.auth);
        }
    },
    handlers : {
        auth : function authHandler(event) {
            event.preventDefault();

            event.target.username.disabled =
            event.target.password.disabled =
            event.target.children[2].disabled = true;

            auth.enticate({
                username : event.target.username.value,
                password : event.target.password.value,
                success : ui.handlers.authSuccess,
                fail : function() {
                    ui.handlers.authFail(event.target);
                }
            });

            return false;
        },
        authSuccess : function() {
            console.log("Auth successful. Launching socket.");

            window.socket = init();
        },
        authFail : function(form) {
            form.username.disabled =
            form.password.disabled =
            form.children[2].disabled = false;

            console.log("Auth failed. Try again.");
        }
    }
};
