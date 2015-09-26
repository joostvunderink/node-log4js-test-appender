'use strict';

var logEvents = [];
var enabled = false;

function testAppender(layout, timezoneOffset) {
  return function(loggingEvent) {
    if (enabled) {
      logEvents.push(loggingEvent);
    }
  };
}

function configure(config) {
  return testAppender('', config.timezoneOffset);
}

function init() {
  var log4js = require('log4js');
  // Make sure we init the test appender no more than once.
  if (!(log4js.appenders && log4js.appenders.testAppender)) {
    log4js.loadAppender('testAppender');
    log4js.addAppender(log4js.appenders['testAppender']())
  }
  enabled = true;
}

function enable() {
  enabled = true;
}

function disable() {
  enabled = false;
}

function getLogEvents() {
  return logEvents;
}

function clearLogEvents() {
  logEvents = [];
}

module.exports = exports = {
  // The two functions needed for log4js.
  appender      : testAppender,
  configure     : configure,

  // The helper functions for in the test suite.
  getLogEvents  : getLogEvents,
  clearLogEvents: clearLogEvents,
  init          : init,
  enable        : enable,
  disable       : disable,
};
