'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var multiline = require('multiline');

var AppGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(chalk.bold(multiline(function () {/*
  ______          __
 /_  __/__  _____/ /___ _
  / / / _ \/ ___/ / __ `/
 / / /  __(__  ) / /_/ /
/_/  \___/____/_/\__,_/

    */
    })));

    this.log('');
    this.log(chalk.underline('What this tool does'));
    this.log('  1. Generates a full app folder structure with default files');
    this.log('  2.', chalk.magenta('git init'),'and modifies global', chalk.magenta('git config'));
    this.log('  3.', chalk.magenta('bower install'));
    this.log('  4.', chalk.magenta('npm install'));
    this.log('');
    this.log(chalk.underline('Notes'));
    this.log('Once complete, open the generated', chalk.magenta('readme.md'), 'for instructions on how to use the app.');
    this.log('');

    var prompts = [
      {
        name: "applicationName",
        message: "Application name?",
        required: true
      },
      {
        name: 'yourName',
        message: 'Author name?',
        required: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.applicationName = props.applicationName || 'application';
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
    // npm will launch the bower install
    this.npmInstall();
  }
});

module.exports = AppGenerator;
