var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

function createApp() {
  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'EJS');

  app.set('title', '<%= _.slugify(applicationName) %>');

  // app.use(favicon(__dirname + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.locals.bundle = require(path.join(__dirname, '../../bundle.result.json'));

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
      res.status(err.status/* || 500*/);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  } else {
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
      res.status(err.status/* || 500*/);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
    });
  }

  return app;
}

module.exports = createApp;