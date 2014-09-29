var srcPath = './src';
var logger = require(srcPath + '/lib/services/logger-service');
var app = require(srcPath)();
var properties = require(srcPath + '/lib/services/property-service').getProperties();
var port = process.env.PORT || properties.get('PORT');

app.set('port', port);

app.listen(port, function () {
  logger.info('Server listening on port %s', port);
});