var express = require('express'),
  path = require('path'),
  glob = require('glob'),
  favicon = require('serve-favicon'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  compression = require('compression'),
  dust = require('dustjs-linkedin'),
  cons = require('consolidate'),
  errorHandler = require('./lib/error-handler'),
  requestLogger = require('./lib/request-logger'),
  DI = require('areus-di'),
  Resource = require('areus-http-resource'),
  di = DI(__dirname),
  resource = Resource(di, express.Router),
  LRU = require('lru-cache'),
  LRUPool = require('lru-cache-pool'),
  logger = require('./lib/services/logger-service'),
  config = require('./lib/services/property-service').getProperties();

module.exports = function () {
  var app = express();

  // define common services
  di.provide({
    config: config,
    cache: LRUPool(LRU),
    logger: logger
  });

  var template_engine = 'dust';
  app.engine(template_engine, cons.dust);
  app.set('views', __dirname + '/views');
  app.set('view engine', template_engine);

  // app.use(favicon(__dirname + '/public/images/favicon.ico'));
  app.use(requestLogger()); // log all requests
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

  // attach top-level routes
  app.use('/', resource('index'));
  app.use('/_health', resource('health'));

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