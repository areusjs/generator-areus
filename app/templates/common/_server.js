var srvPath = './src/server';
var log = require(srvPath + '/lib/logger');
var app = require(srvPath)();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  log.info('Server listening on port %s', server.address().port);
});