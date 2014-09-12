var bunyan = require('bunyan');
// naturally a singleton because node's require caches the value assigned to module.exports
module.exports = bunyan.createLogger({name: '<%= _.slugify(applicationName) %>'});