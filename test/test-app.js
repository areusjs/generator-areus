/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('app:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        applicationName: 'application',
        yourName: 'Chris',
        isPublic: true
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
      'bin/git-init.js',
      'src/server/index.js',
      'src/server/routes/index.js',
      'src/server/views/index.html',
      'src/client/scripts/app.js',
      'src/client/styles/main.less',
      'test/index.js'
    ]);
  });
});
