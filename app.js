'use strict';

var sternParent = require('./parent.js');


var path = require('path');
var childPath = path.join(__dirname, './child.js');


console.log(sternParent(childPath, [1, 2, 3]));
