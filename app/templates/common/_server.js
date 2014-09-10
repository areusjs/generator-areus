var srcPath = './src';
var logger = require(srcPath + '/lib/logger');
var app = require(srcPath)();
var properties = require(srcPath + '/lib/property-service').getProperties();
var port = properties.get('PORT');

app.set('port', port);

app.listen(port, function () {
  logger.info('Server listening on port %s', port);
});