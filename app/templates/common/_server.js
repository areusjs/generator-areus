var debug = require('debug')('expressapp');
var app = require('./src/server')();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  debug('Server listening on port ' + server.address().port);
});
