'use strict';

var auth = {
    enticate : function(options) {
        return new Promise(function ajaxExec(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.open('POST', backendURL + '/auth', true);
            xhr.addEventListener('load', resolve);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({
                username : options.username,
                password : options.password
            }));
        }).then(function(event) {
            if(event.target.status === 200) {
                return options.success();
            } else {
                return options.fail();
            }
        }).catch(options.fail);
    }
};
