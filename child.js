// runs the code, reports back


'use strict';

var argv = require('yargs').argv;

var codeId = argv.codeId;
var reqId = argv.reqId;


console.log(codeId, reqId);

// attempt to run away
// process.disconnect();

// infinite
setInterval(function () {
    console.log('setInterval');
}, 1000);

// ignore kill
// process.on('SIGTERM', function () {
//     console.log('ignore SIGTERM');
// });

// throws
// process.on('SIGKILL', function () {
//     console.log('ignore SIGKILL');
// })

// process.send('timer-end');

process.send({
    type: 'timer-start',
    ms: 500
});

process.send('timer-sent');
