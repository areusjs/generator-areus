var chalk = require('chalk'),
  moment = require('moment');

function currentTime() {
  return "[" + chalk.bgBlack.cyan(moment().format('h:mm:ss a')) + "]";
}

module.exports = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(currentTime());
  console.log.apply(console.log, args);
};

module.exports.error = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(chalk.bgRed.white('ERR!'));
  args.unshift(currentTime());
  console.log.apply(console.log, args);
};

module.exports.info = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(chalk.bgBlue.white('INFO'));
  args.unshift(currentTime());
  console.log.apply(console.log, args);
};