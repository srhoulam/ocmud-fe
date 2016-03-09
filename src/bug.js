import constants from './constants';

export default function(message) {
    return new Promise(function ajaxExec(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
        xhr.open('POST', constants.backendURL + '/bug', true);
        xhr.addEventListener('load', resolve);
        xhr.addEventListener('error', reject);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            report : message
        }));
    });
}
