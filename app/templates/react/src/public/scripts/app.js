/** @jsx React.DOM */

var React = require('react');
var MyApp = require('../../components/MyApp.react.jsx');

// Snag the initial state that was passed from the server side
var stateDom = document.getElementById('initial-state');
if (stateDom) {

  var initialStateString = stateDom.innerHTML;
  if (initialStateString) {
    var initialState = JSON.parse(initialStateString);

    // Render the components, picking up where react left off on the server
    React.renderComponent(
      <MyApp title={initialState.title} message={initialState.message}/>,
      document.getElementById('react-app')
    );
  }

}
