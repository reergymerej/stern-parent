# stern-parent

Use to launch a module in another process.  The other process will be forcibly killed once the timer expires, even if the script is unresponsive or hijacking SIGTERM.

## Example

```js
var sternParent = require('stern-parent');
var path = require('path');
var modulePath = path.join(__dirname, './obedientChild.js');

// launch obedientChild in another process
// give it 2000 ms to live
// pass arguments, available through process.argv
sternParent.birth(modulePath, 2000, ['baz', 'quux']);
```

If needed, you can cancel or reset the countdown from within the child module.

```js
// obedientChild.js

// restart the countdown
process.send('countdown');

// restart at a different point
process.send({
  type: 'countdown',
  ms: 500
});

// cancel countdown altogether
process.send('cancel');
```


**TODO**
* set option to toggle logging