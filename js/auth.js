'use strict';

var auth = {
    enticate : function(options) {
        var p = $.ajax({
            url : backendURL + "/auth",
            method : 'POST',
            contentType : "application/json",
            data : JSON.stringify({
                username : options.username,
                password : options.password
            }),
            success : options.success,
            fail : options.fail
        });

        return p;
    }
};
