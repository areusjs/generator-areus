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
    ___                            __  ___          __      __
   /   |  ________  __  _______   /  |/  /___  ____/ /_  __/ /__
  / /| | / ___/ _ \/ / / / ___/  / /|_/ / __ \/ __  / / / / / _ \
 / ___ |/ /  /  __/ /_/ (__  )  / /  / / /_/ / /_/ / /_/ / /  __/
/_/  |_/_/   \___/\__,_/____/  /_/  /_/\____/\__,_/\__,_/_/\___/
                                                                 
    */
    })));
    this.log('');

    var prompts = [
      {
        name: "moduleName",
        message: "Module name?",
        default: path.basename(process.cwd())
      },
      {
        name: 'yourName',
        message: 'Author name?'
      }
    ];

    this.prompt(prompts, function (props) {
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
