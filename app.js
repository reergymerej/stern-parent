'use strict';

var util = require('util');
var child_process = require('child_process');

var children = [];

var clearReference = function (child) {
  children.splice(children.indexOf(child), 1);
};

var Child = function (modulePath, countdown, args) {
  this.callbacks = {};
  this.countdown = countdown || 5000;
  this.exited = false;
  this.killTimeout = null;
  this.child = child_process.fork(modulePath, args);

  this.addHandlers();
  this.scheduleKill();
};

Child.prototype.log = function () {
  var args = Array.prototype.slice.apply(arguments);
  var formatted = util.format.apply(util.format, args);
  console.log(this.child.pid + ' > ' + formatted);
};

Child.prototype.addHandlers = function () {
  this.child.on('exit', this.onExit.bind(this)).
  on('close', this.onClose.bind(this)).
  on('message', this.onMessage.bind(this));
};

Child.prototype.onExit = function () {
  this.exited = true;
};

Child.prototype.onClose = function () {
  this.cancelScheduledKill();
  clearReference(this.child);
  if (typeof this.callbacks.done === 'function') {
    this.callbacks.done();
  }
};

Child.prototype.onMessage = function (message) {
  var type = message.type || message;

  switch (type) {
    case 'countdown':
      this.scheduleKill(message.ms);
      break;
    case 'cancel':
      this.cancelScheduledKill();
      break;
  }
};

Child.prototype.forceKill = function () {
  this.child.kill();
  if (!this.exited) {
    this.log('forcing kill');
    this.child.kill('SIGKILL');
  }
};

Child.prototype.scheduleKill = function (ms) {
  var me = this;
  ms = ms || this.countdown;

  if (this.killTimeout) {
    // this.log('bumping timer');
    this.cancelScheduledKill();
  }

  this.killTimeout = setTimeout(function () {
    me.log('killing child process');
    me.forceKill();
  }, ms);

  this.log('will be killed in %d ms', ms);
};

Child.prototype.cancelScheduledKill = function () {
  clearTimeout(this.killTimeout);
  this.killTimeout = null;
};

Child.prototype.on = function (eventName, callback) {
  this.callbacks[eventName] = callback;
};

var birth = function (modulePath, countdown, args) {
  var child = new Child(modulePath, countdown, args);
  children.push(child);
  return child;
};

module.exports = {
  birth: birth
};
