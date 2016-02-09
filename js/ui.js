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
    }
};
