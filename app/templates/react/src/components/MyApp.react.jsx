/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');
var _ = require('lodash');

module.exports = MyApp = React.createClass({
    getInitialState: function () {
      return this.props;
    },
    render: function () {
      return (
        <div className="container">
          <h1>{this.state.title}</h1>
          <div>{this.state.message}</div>
        </div>
      )
    }
});
