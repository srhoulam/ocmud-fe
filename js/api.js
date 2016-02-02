'use strict';

var backendURL = "http://localhost:3000";

var api;

function initApi() {
    var io = socket.init(backendURL);

    window.api = {
        confirm : function confirm(code) {
            return io.emit('command', {
                command : 'confirmEmail',
                'code' : code
            });
        },
        connect : function connect(direction, index) {
            return io.emit('command', {
                command : 'connect',
                'direction' : direction,
                'index' : index
            });
        },
        create : function create(direction, description) {
            return io.emit('command', {
                command : 'create',
                'direction' : direction,
                'description' : description
            });
        },
        go : function go(direction) {
            return io.emit('command', {
                command : 'travel',
                'direction' : direction
            });
        },
        jump : function jump(index) {
            return io.emit('command', {
                command : 'jump',
                'index' : index
            });
        },
        list : function list() {
            return io.emit('command', {
                command : 'list'
            });
        },
        look : function look() {
            return io.emit('command', {
                command : 'look'
            });
        },
        quit : function quit() {
            return io.emit('command', {
                command : 'quit'
            });
        },
        say : function say(message) {
            return io.emit('command', {
                command : 'say',
                'message' : message
            });
        },
        write : function write(text) {
            return io.emit('command', {
                command : 'write',
                message : text
            });
        }
    };
}
