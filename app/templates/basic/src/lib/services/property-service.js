var path = require('path'),
  fs = require('fs'),
  nconf = require('nconf'),
  logger = require('./logger-service'),
  CONFIG_BASE_PATH = '../../../config/',
  DEV_ENV = 'development';

/**
 * Will use environment specific properties based off NODE_ENV, for example:
 *    NODE_ENV=production node server.js
 * will use /config/production.json
 * plus default properties from default.json
 *
 * nconf will prefer (in order):
 *  1. Command-line arguments
 *  2. Environment variables
 *  3. A file located at '/config/<NODE_ENV>.json'
 *  4. A file located at '/config/default.json'
 *
 * @constructor
 */
function PropertyService() {
  var nodeEnv = (process.env.NODE_ENV || DEV_ENV);
  var configPath = path.join(__dirname, CONFIG_BASE_PATH, nodeEnv + '.json');

  if (nodeEnv !== DEV_ENV) {
    fs.exists(configPath, function (exists) {
      if (!exists) {
        logger.warn('Failed to load config for NODE_ENV=' + nodeEnv + '. File not found: ' + configPath);
      }
    });
  }

  this._properties = nconf
    .argv()
    .env()
    .file(nodeEnv, path.join(__dirname, CONFIG_BASE_PATH, nodeEnv + '.json'))
    .file('default', path.join(__dirname, CONFIG_BASE_PATH, 'default.json'));
}

PropertyService.prototype.getProperties = function () {
  return this._properties;
};

// naturally a singleton because node's require caches the value assigned to module.exports
module.exports = new PropertyService();