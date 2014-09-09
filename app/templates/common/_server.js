var srcPath = './src';
var log = require(srcPath + '/lib/logger');
var app = require(srcPath)();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  log.info('Server listening on port %s', server.address().port);
});