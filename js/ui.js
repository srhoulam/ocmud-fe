'use strict';

var ui = {
    elements : {
        auth : document.getElementById('auth'),
        explore : document.querySelector("button[type=button]")
    },
    methods : {
        addToChatLog : function addToChat(message) {
            reactViews.chatLog.add(message);
        },
        addToInfoLog : function addToLog(type, info) {
            reactViews.infoLog.add({
                'type' : type,
                message : info
            });
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
