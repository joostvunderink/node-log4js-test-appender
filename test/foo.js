'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger('foo');

function logInfo(format, arg) {
  // This could be done better with logger.info.apply but that
  // is not relevant for this test.
  if (arg) {
    logger.info(format, arg);
  }
  else {
    logger.info(format);
  }
}

module.exports = exports = {
  logInfo: logInfo
};