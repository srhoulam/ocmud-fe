'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    enticate: function enticate(options) {
        return new Promise(function ajaxExec(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.open('POST', _constants2.default.backendURL + '/auth', true);
            xhr.addEventListener('load', resolve);
            xhr.addEventListener('error', reject);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({
                username: options.username,
                password: options.password,
                email: options.email
            }));
        }).then(function (event) {
            if (event.target.status === 200) {
                return options.success();
            } else if (event.target.status === 400) {
                return options.fail();
            } else {
                return options.error();
            }
        }).catch(options.fail);
    }
};
//# sourceMappingURL=auth.js.map
