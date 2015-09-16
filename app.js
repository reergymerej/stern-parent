'use strict';

var sternParent = require('./parent.js');

var path = require('path');
var childPath = path.join(__dirname, './child.js');

sternParent.birth(childPath, 2000, ['baz', 'quux']);
sternParent.birth(childPath, null, ['--foo=bar']);
