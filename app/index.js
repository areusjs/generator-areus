'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var multiline = require('multiline');
var generatorUtils = require(path.join(__dirname, '../lib/utils'));

var AppGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(chalk.bold(multiline(function () {/*
    ___
   /   |  ________  __  _______
  / /| | / ___/ _ \/ / / / ___/
 / ___ |/ /  /  __/ /_/ (__  )
/_/  |_/_/   \___/\__,_/____/

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
        required: true,
        default: path.basename(process.cwd())
      },
      {
        name: 'yourName',
        message: 'Author name?',
        required: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.applicationName = props.applicationName;
      this.yourName = props.yourName;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.sourceRoot(path.join(__dirname, '../common/templates'));
      generatorUtils.processDirectory(this, '.', '.');
      this.sourceRoot(path.join(__dirname, 'templates/common'));
      generatorUtils.processDirectory(this, '.', '.');
      this.sourceRoot(path.join(__dirname, 'templates/basic'));
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
