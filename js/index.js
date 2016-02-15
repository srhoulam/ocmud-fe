'use strict';

var app = {
    loggedInAs : false
};

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded");
});
window.addEventListener('load', function() {
    console.log("Page fully loaded.");
    ui.methods.init();
});
