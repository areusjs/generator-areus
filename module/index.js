'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var multiline = require('multiline');
var generatorUtils = require('../lib/utils.js');

var AppGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(chalk.bold(multiline(function () {/*
  ______          __         __  ___          __      __
 /_  __/__  _____/ /___ _   /  |/  /___  ____/ /_  __/ /__
  / / / _ \/ ___/ / __ `/  / /|_/ / __ \/ __  / / / / / _ \
 / / /  __(__  ) / /_/ /  / /  / / /_/ / /_/ / /_/ / /  __/
/_/  \___/____/_/\__,_/  /_/  /_/\____/\__,_/\__,_/_/\___/

    */
    })));
    this.log('');

    var prompts = [
      {
        name: "moduleName",
        message: "Module name?"
      },
      {
        name: 'yourName',
        message: 'Author name?'
      }
    ];

    this.prompt(prompts, function (props) {
      if (!props.moduleName) {
        throw new Error('module name is required.')
      }
      this.moduleName = props.moduleName;
      this.yourName = props.yourName;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.sourceRoot(path.join(__dirname, '../common/templates'));
      generatorUtils.processDirectory(this, '.', '.');
      this.sourceRoot(path.join(__dirname, 'templates'));
      generatorUtils.processDirectory(this, '.', '.');
    }
  },

  end: function () {
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install']
    });
  }
});

module.exports = AppGenerator;
