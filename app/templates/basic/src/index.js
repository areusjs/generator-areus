var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var errorHandler = require('./routes/error');
var mustlayout = require('mustlayout');
var requestLogger = require('./lib/request-logger');

module.exports = function () {
  var app = express();

  mustlayout.engine(app, {
    engine: require('hogan-express'),
    ext: '.html',
    views: 'src/views',
    layouts: 'src/views/layouts',
    partials: 'src/views/partials',
    cache: 'src/views/cache'
  });

  // app.use(favicon(__dirname + '/public/img/favicon.ico'));
  app.use(requestLogger()); // log all requests
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());

  // variables available on every view model
  app.set('title', '<%= applicationName %>');
  app.set('bundle', require(path.join(__dirname, '../bundle.result.json')));

  app.use('/public', express.static(path.join(__dirname, '../public')));
  app.use('/', routes);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    // will print stacktrace
    app.use(errorHandler);
  } else {
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
      errorHandler({
        status: err.status,
        message: err.message
      }, req, res, next);
    });
  }

  return app;
};