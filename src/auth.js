import constants from './constants';

export default {
    enticate : function(options) {
        return new Promise(function ajaxExec(resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.open('POST', constants.backendURL + '/auth', true);
            xhr.addEventListener('load', resolve);
            xhr.addEventListener('error', reject);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({
                username : options.username,
                password : options.password,
                email : options.email
            }));
        }).then(function(event) {
            if(event.target.status === 200) {
                return options.success();
            } else if(event.target.status === 400) {
                return options.fail();
            } else {
                return options.error();
            }
        }).catch(options.fail);
    }
};
