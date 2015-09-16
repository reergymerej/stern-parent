'use strict';

var sternParent = require('../app.js');

var child = sternParent.birth('./mod.js');

child.on('done', function () {
    console.log('child done');
});

var child2 = sternParent.birth('./mod.js', 1000, ['interval']);

child2.on('done', function () {
    console.log('child2 done');
});