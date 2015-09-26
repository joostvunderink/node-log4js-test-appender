'use strict';

// This file has to be called the same as the npm package name,
// to make sure that the log4js.loadAppender line will work in the
// test suite.

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
    log4js.loadAppender('log4js-test-appender');
    log4js.addAppender(log4js.appenders['log4js-test-appender']())
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
