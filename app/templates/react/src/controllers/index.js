var express = require('express');
var router = express.Router();
var JSX = require('node-jsx').install({extension: '.jsx'});
var React = require('react');
var reactView = 'MyApp.react.jsx';
var MyApp = require('../components/' + reactView);
var expressApp;

module.exports = function (app) {
  app.use('/', router);
  expressApp = app;
};

router.get('/', function (req, res) {

  var currentState = {
    title: expressApp.get("title"),
    message: 'Hello, world.'
  };

  var markup = React.renderToString(
    React.createElement(MyApp, currentState)
  );

  res.render('index', {
    entry: reactView,
    markup: markup, // Pass rendered react markup
    state: JSON.stringify(currentState) // Pass current state to client side
  });

});
