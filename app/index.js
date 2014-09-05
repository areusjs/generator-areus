'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var multiline = require('multiline');

var AppGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(multiline(function () {/*
  ______          __
 /_  __/__  _____/ /___ _
  / / / _ \/ ___/ / __ `/
 / / /  __(__  ) / /_/ /
/_/  \___/____/_/\__,_/

    */
    }));

    this.log('\n');

    var prompts = [
      {
        name: "applicationName",
        message: "Application name?",
        default: "application"
      },
      {
        name: 'yourName',
        message: 'Your name?',
        default: "Chris Montgomery"
      },
      {
        type: 'confirm',
        name: 'isPublic',
        message: 'Is public?',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.applicationName = props.applicationName;
      this.isPublic = props.isPublic;
      this.yourName = props.yourName;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.sourceRoot(path.join(__dirname, 'templates', 'common'));
      this.expandFiles('**', { cwd: this.sourceRoot() }).map(function (file) {
        this.template(file, file.replace(/^_/, ''));
      }, this);
      this.sourceRoot(path.join(__dirname, 'templates', 'basic'));
      this.directory('.', '.');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = AppGenerator;
