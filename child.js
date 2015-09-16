'use strict';

console.log(process.argv);

// attempt to run away
// process.disconnect();

// infinite
setInterval(function () {
    console.log(process.pid, 'setInterval');
}, 1000);



var vm = require('vm');
var code = 'while(1) {}';
vm.runInThisContext(code);

// ignore kill
// process.on('SIGTERM', function () {
//     console.log('ignore SIGTERM');
// });

// throws
// process.on('SIGKILL', function () {
//     console.log('ignore SIGKILL');
// })

// process.send('timer-end');

// process.send({
//     type: 'countdown',
//     ms: 500
// });

// process.send('cancel');
