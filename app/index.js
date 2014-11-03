'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var multiline = require('multiline');
var generatorUtils = require(path.join(__dirname, './../lib/utils'));

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
    this.log('  2. Modifies global', chalk.magenta('git config'));
    this.log('  3.', chalk.magenta('bower install'));
    this.log('  4.', chalk.magenta('npm install'));
    this.log('');
    this.log(chalk.underline('Notes'));
    this.log('Once complete, open the generated', chalk.magenta('readme.md'), 'for instructions on how to use the app.');
    this.log('');

    var prompts = [
      {
        type: 'input',
        name: "applicationName",
        message: "Application name?",
        default: path.basename(process.cwd())
      },
      {
        type: 'input',
        name: 'yourName',
        message: 'Author name?'
      },
      {
        type: 'list',
        name: 'templateEngine',
        message: 'Which template engine do you want to use?',
        choices: [
          {
            name: "Dustjs",
            value: "dustjs"
          },
          {
            name: "React",
            value: "react"
          }
        ],
        default: "react"
      }
    ];

    this.prompt(prompts, function (props) {
      this.applicationName = props.applicationName;
      this.yourName = props.yourName;
      this.templateEngine = props.templateEngine;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      generatorUtils.processDirectory(this, path.join(__dirname, 'templates/common'), '.');
      generatorUtils.processDirectory(this, path.join(__dirname, 'templates/basic'), '.');
      if (this.templateEngine === 'react') {
        generatorUtils.processDirectory(this, path.join(__dirname, 'templates/react'), '.');
      } else if (this.templateEngine === 'dustjs') {
        generatorUtils.processDirectory(this, path.join(__dirname, 'templates/dustjs'), '.');
      } else {
        throw new Error('Invalid templateEngine:', this.templateEngine)
      }
    }
  },

  // some files don't get copied properly named as is (e.g. .gitignore) start name with _ and convert
  packageFiles: function packageFiles() {
    this.sourceRoot(path.join(__dirname, '../common/templates'));
    this.template('_editorconfig', '.editorconfig');
    this.template('_gitattributes', '.gitattributes');
    this.template('_gitignore', '.gitignore');
    this.template('_npmignore', '.npmignore');
  },

  end: function () {
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install']
    });
  }
});

module.exports = AppGenerator;
