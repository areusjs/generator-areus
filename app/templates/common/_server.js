var debug = require('debug')('expressapp');

require('src/server')()
  .then(function (app) {
    app.set('port', process.env.PORT || 3000);
    var server = app.listen(app.get('port'), function () {
      debug('Server listening on port ' + server.address().port);
    });
    require('src/server/socket')(server);
  });
