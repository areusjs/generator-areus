var log = require('./src/server/console-log'),
  app = require('./src/server')();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  log.info('Server listening on port ' + server.address().port);
});