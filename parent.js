// This spawns a child and forcefully closes it after a timer expires.
// The child can extend the timer if needed.

'use strict';

var child_process = require('child_process');
var exited = false;
var killTimeout = null;
var child;

var forceKill = function () {
    child.kill();
    if (!exited) {
        child.kill('SIGKILL');
    }
};

var scheduleKill = function (ms) {
    ms = ms || 5000;

    if (killTimeout) {
        console.log('bumping timer');
        cancelScheduledKill();
    }

    killTimeout = setTimeout(function () {
        console.log('timer expired');
        forceKill();
    }, ms);

    console.log('child will be killed in %dms', ms);
};

var cancelScheduledKill = function () {
    clearTimeout(killTimeout);
    killTimeout = null;
};

var startChild = function (modulePath, args) {
    child = child_process.fork(modulePath, args);

    scheduleKill();

    child.on('error', function (err) {
        console.log('error', err);

    }).on('exit', function (code, signal) {
        console.log('exit', code, signal);
        exited = true;

    }).on('close', function (code, signal) {
        console.log('close', code, signal);
        exited = false;
        killTimeout = null;

    }).on('disconnect', function () {
        console.log('disconnected');

    }).on('message', function (message, sendHandle) {

        var type = message.type || message;

        switch (type) {
            case 'timer-start':
                scheduleKill(message.ms);
                break;
            case 'timer-end':
                cancelScheduledKill();
                break;
            default:
                console.log('message', message, sendHandle);
        }
    });
};

module.exports = function (modulePath, args) {
    return startChild(modulePath, args);
};
