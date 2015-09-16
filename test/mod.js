'use strict';

console.log('hello');

if (process.argv[2] === 'interval') {

    setInterval(function () {
        console.log('interval');
    }, 333);
}