var express = require('express');
var path = require('path');
var glob = require('glob');
//var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var cons = require('consolidate');
var errorHandler = require('./lib/error-handler');
var requestLogger = require('./lib/request-logger');

module.exports = function () {
  var app = express();

  var template_engine = 'dust';
  app.engine(template_engine, cons.dust);
  app.set('views', __dirname + '/views');
  app.set('view engine', template_engine);

  // app.use(favicon(__dirname + '/public/images/favicon.ico'));
  if (process.env.NODE_ENV !== 'production') {
    app.use(requestLogger()); // log all requests
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compression());

  // variables available on every view model
  app.set('title', '<%= applicationName %>');
  app.set('bundle', require(path.join(__dirname, '../bundle.result.json')));

  // make all static files available under /public route
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // dynamically load all routes
  var controllersPath = path.join(__dirname, 'controllers');
  var controllers = glob.sync(controllersPath + '/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

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
