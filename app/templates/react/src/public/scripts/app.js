/** @jsx React.DOM */

var React = require('react');
// Hack to load all react views via browserify into memory. Never call this function!
function ಠ_ಠ() {
  require('../../components/*.react.jsx', { glob: true })
}

// Snag the initial state that was passed from the server side
var stateDom = document.getElementById('initial-state');
if (stateDom) {
  var initialStateString = stateDom.innerHTML;
  var componentEntry = stateDom.dataset.componentEntry;
  var EntryView = require('../../components/' + componentEntry);
  if (initialStateString) {
    var initialState = JSON.parse(initialStateString);
    // Render the components, picking up where react left off on the server
    React.render(
      <EntryView {...initialState}/>,
      document.getElementById('react-app')
    );
  }
}
