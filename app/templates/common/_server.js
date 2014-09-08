var bunyan = require('bunyan');
var log = bunyan.createLogger({name: '<%= _.slugify(applicationName) %>'});
var app = require('./src/server')();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  log.info('Server listening on port %s', server.address().port);
});