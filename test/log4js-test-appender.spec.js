'use strict';

var should = require('should');
var path   = require('path');

// Foo is a module that logs stuff.
// We require this module, to make sure that this test file does not contain
// any log4js definitions, to keep the test as pure as possible.
var foo = require('./foo');

describe('testAppender', function() {
  var testAppender = require('log4js-test-appender');

  it('should call init successfully', function() {
    testAppender.init();
  });

  it('should track a log event', function() {
    foo.logInfo('foo');
    var logEvents = testAppender.getLogEvents();
    logEvents.should.have.length(1);
    logEvents[0].data.should.have.length(1);
    logEvents[0].data[0].should.equal('foo');
    logEvents[0].level.levelStr.should.equal('INFO');
  });

  it('should track a second log event', function() {
    foo.logInfo('bar');
    var logEvents = testAppender.getLogEvents();
    logEvents.should.have.length(2);
    logEvents[0].data.should.have.length(1);
    logEvents[0].data[0].should.equal('foo');
    logEvents[1].data.should.have.length(1);
    logEvents[1].data[0].should.equal('bar');
  });

  it('should clear the event log', function() {
    testAppender.clearLogEvents();
    var logEvents = testAppender.getLogEvents();
    logEvents.should.have.length(0);
  });

  it('should not log an event while disabled', function() {
    testAppender.disable();
    foo.logInfo('foo');
    testAppender.enable();
    var logEvents = testAppender.getLogEvents();
    logEvents.should.have.length(0);
  });

  it('should track a formatted string log event', function() {
    var firstName = 'Rupert';
    foo.logInfo('Hello, %s.', firstName);
    var logEvents = testAppender.getLogEvents();
    logEvents.should.have.length(1);
    logEvents[0].data.should.have.length(2);
    logEvents[0].data[0].should.equal('Hello, %s.');
    logEvents[0].data[1].should.equal(firstName);
    logEvents[0].level.levelStr.should.equal('INFO');
  });
});
