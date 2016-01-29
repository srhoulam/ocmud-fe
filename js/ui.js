'use strict';

var ui = {
    elements : {
        raw : document.getElementById('raw'),
        name : document.getElementById('name'),
        desc : document.getElementById('desc'),
        exits : document.getElementById('exits'),
        auth : document.getElementById('auth'),
        wall : document.getElementById('writings')
    },
    methods : {
        addToLog : function addToLog(info) {
            console.log(info);
        },
        addToWall : function addToWall(writing) {
            var li = document.createElement('li');
            li.textContent = JSON.stringify(writing);
            ui.elements.wall.appendChild(li);
        },
        displaySight : function displaySight(sight) {
            ui.elements.raw.textContent = JSON.stringify(sight);
            ui.elements.name.textContent = sight.name;
            ui.elements.desc.textContent = sight.desc;
            ui.elements.exits.textContent = sight.exits;

            Array.prototype.forEach.
                call(ui.elements.wall.children, c => c.remove());
            sight.writings && sight.writings.forEach(function(w) {
                ui.methods.addToWall(w);
            });
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
            event.target.email.disabled =
            event.target.children[2].disabled = true;

            auth.enticate({
                username : event.target.username.value,
                password : event.target.password.value,
                email : event.target.email.value,
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
            form.email.disabled =
            form.children[2].disabled = false;

            console.log("Auth failed. Try again.");
        }
    }
};
