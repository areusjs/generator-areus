var express = require('express');
var router = express.Router();
var JSX = require('node-jsx').install({extension: '.jsx'});
var React = require('react');
var MyApp = require('../components/MyApp.react.jsx');
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

  var markup = React.renderComponentToString(
    MyApp(currentState)
  );

  res.render('index', {
    markup: markup, // Pass rendered react markup
    state: JSON.stringify(currentState) // Pass current state to client side
  });

});
