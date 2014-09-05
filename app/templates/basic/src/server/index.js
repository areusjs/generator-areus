var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var mustlayout = require('mustlayout');

module.exports = function () {
  var app = express();

  mustlayout.engine(app, {
    engine: require('hogan-express'),
    ext: '.html',
    views: 'src/server/views',
    layouts: 'src/server/views/layouts',
    partials: 'src/server/views/partials',
    cache: 'src/server/views/cache'
  });

  // app.use(favicon(__dirname + '/public/img/favicon.ico'));
  app.use(logger('dev')); // log all requests
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());

  // variables available on every view model
  app.set('title', '<%= applicationName %>');
  app.set('bundle', require(path.join(__dirname, '../../bundle.result.json')));

  app.use('/public', express.static(path.join(__dirname, '../../public')));
  app.use('/', routes);

  /// catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      err.status = err.status || 500;
      res.status(err.status);
      res.render('error', {
        status: err.status,
        message: err.message || 'Internal Server Error',
        error: err
      });
    });
  } else {
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
      err.status = err.status || 500;
      res.status(err.status);
      res.render('error', {
        status: err.status,
        message: err.message || 'Internal Server Error',
        error: {}
      });
    });
  }

  return app;
};