var bunyan = require('bunyan');
module.exports = bunyan.createLogger({name: '<%= _.slugify(applicationName) %>'});