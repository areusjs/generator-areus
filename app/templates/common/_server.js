var srcPath = './src';
var log = require(srcPath + '/lib/logger');
var app = require(srcPath)();
var properties = require(srcPath + '/lib/PropertyService').getProperties();
var port = properties.get('PORT');

app.set('port', port);

app.listen(port, function () {
  log.info('Server listening on port %s', port);
});