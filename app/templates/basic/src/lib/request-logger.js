var morgan = require('morgan');
var logger = require('./services/logger-service');
var Stream = require('stream');

var bunyanStream = new Stream();
bunyanStream.writable = true;
bunyanStream.write = function (obj) {
  logger.info('%s', obj.trim()); // remove unnecessary newlines coming from morgan
};

// uses morgan because of its accuracy with timing requests
module.exports = function () {
  return morgan('dev', {
    stream: bunyanStream
  });
};