/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('areus:app', function () {
  beforeEach(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({
        'skip-install': true
      })
      .withPrompt({
        applicationName: 'My Application',
        yourName: 'Chris M'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.bowerrc',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.npmignore',
      'bower.json',
      'bundle.config.js',
      'gulpfile.js',
      'package.json',
      'readme.md',
      'server.js',
      'servo.json',
      'src/index.js',
      'src/controllers/index.js',
      'src/views/index.dust',
      'src/public/scripts/app.js',
      'src/public/styles/main.less',
      'test/index.js'
    ]);
  });
});
