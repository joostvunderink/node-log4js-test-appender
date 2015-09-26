# log4js-test-appender

Provides a log4js appender for your test suite to test log events.

# Introduction

Sometimes, you have a piece of code that logs something via log4js, and you want to verify in your test suite that the right thing is logged. This log4js appender will store all log lines that are created with log4js so you can inspect them in your test suite.

Please note that this is a basic first working version. I'm sure that the way this appender works could be improved. If you have any suggestions, feel free to contact me at joost@vunderink.net or to create a pull request.

# Synopsis

    # This is your test file
    var testAppender = require('log4js-test-appender');
    testAppender.init();

    functionThatLogsSomething();

    var logEvents = testAppender.getLogEvents();
    assert(logEvents.length === 1);
    assert(logEvents.data[0] === 'the logged text');

# Installing

    npm install log4js-test-appender

# API

The test appender has a few utility methods to help you test your log events.

## init()

`init()` needs to be called to set up the appender. This will add the test appender to log4s and enable it.

Calling `init()` multiple times has no effect and is harmless.

Unfortunately, I currently know of no good way to remove the test appender. The `log4js` API does not seem to allow removing appenders.

## getLogEvents()

Returns the list of log events that have been captured by the test appender since it was enabled.

Each log event looks like this:

    {
        startTime: Sat Sep 26 2015 10:05:14 GMT+0200 (CEST),
        categoryName: 'foo',
        data: [ 'hello %s %s', 'Joe', 'Banana' ],
        level: { level: 20000, levelStr: 'INFO' },
        logger: { category: 'foo', _events: [Object] }
    }

## clearLogEvents()

Clears the list of captured log events. After this, `getLogEvents()` would return an empty list. Any new log events will be captured as normal.

## disable()

Disables the test appender. Any log events after this will not be captured. All log events captured before this are kept.

## enable()

Enables the test appender. Log events will be captured from now on. The test appender is turned on by default once `init()` is called.

# Running tests

You can run the tests by executing

`npm test`

Note that this runs `NODE_PATH=$NODE_PATH:src mocha test/testAppender.js`. Because `log4js` only finds appenders inside its own `appenders` dir or installed globally, I'm setting `NODE_PATH` to make sure `log4s` will be able to find `testAppender.js`. It would be better if this could be done in the test itself, but it appears that node.js only looks at the `NODE_PATH` environment variable on startup.

# Possible improvements

There are some things that could be done to improve this module.

* Remove the test appender from log4js after the tests are done.
* Maybe make the test appender act more like a spy or mock. Like sinon.
* Add convenience methods for verifying log events. I'm not sure what a good API would be for this.
