'use strict';

var ui = {
    elements : {
        raw : document.getElementById('raw'),
        name : document.getElementById('name'),
        desc : document.getElementById('desc'),
        exits : document.getElementById('exits'),
        auth : document.getElementById('auth'),
        wall : document.getElementById('writings'),
        explore : document.querySelector("button[type=button]")
    },
    methods : {
        addToChatLog : function addToChat(message) {
            console.log(message);
            reactViews.chatLog.add(message);
        },
        addToInfoLog : function addToLog(type, info) {
            reactViews.infoLog.add({
                'type' : type,
                message : info
            });
        },
        addToWall : function addToWall(writing) {
            var li = document.createElement('li');
            li.textContent = JSON.stringify(writing);
            ui.elements.wall.appendChild(li);
        },
        ageMessages : function ageMessages() {
            reactViews.infoLog.tick();
        },
        applyHandlers : function applyHandlers() {
            ui.elements.auth.addEventListener('submit', ui.handlers.auth);
            ui.elements.explore.addEventListener('click', ui.handlers.explore);
        },
        displaySight : function displaySight(sight) {
            reactViews.location.setState(sight);
            // reactViews.surface.setState({
            //     name : sight.surface,
            //     writings : sight.writings
            // });

            ui.elements.raw.textContent = JSON.stringify(sight);
            ui.elements.name.textContent = sight.name;
            ui.elements.desc.textContent = sight.description;
            ui.elements.exits.textContent = sight.exits;

            Array.prototype.forEach.
                call(ui.elements.wall.children, c => c.remove());
            sight.writings && sight.writings.forEach(function(w) {
                ui.methods.addToWall(w);
            });
        },
        handleTravel : function handleTravel(info) {
            if(info === true) {
                ui.methods.ageMessages();
            } else if(info !== false) {
                //  not a boolean
                ui.methods.addToInfoLog('travel', info);
            }
        }
    },
    handlers : {
        auth : function authHandler(event) {
            event.preventDefault();

            event.target.username.disabled =
            event.target.password.disabled =
            event.target.email.disabled =
            event.target.children[3].disabled =
            event.target.children[4].disabled = true;

            let username = event.target.username.value;

            auth.enticate({
                'username' : username,
                password : event.target.password.value,
                email : event.target.email.value,
                success : ui.handlers.authSuccess(username),
                fail : function() {
                    ui.handlers.authFail(event.target);
                }
            });

            return false;
        },
        authSuccess : function(username) {
            return function() {
                console.log("Auth successful. Launching socket.");
                app.loggedInAs = username;
                return initApi();
            };
        },
        authFail : function(form) {
            form.username.disabled =
            form.password.disabled =
            form.email.disabled =
            form.children[3].disabled =
            form.children[4].disabled = false;

            console.log("Auth failed. Try again.");
        },
        explore : function exploreHandler() {
            console.log("Explore mode. Launching socket.");

            return initApi();
        }
    }
};
