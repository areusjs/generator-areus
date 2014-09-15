/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('tesla:module', function () {
  beforeEach(function (done) {
    helpers.run(path.join(__dirname, '../module'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({
        'skip-install': true
      })
      .withPrompt({
        moduleName: 'tesla-module',
        yourName: 'Chris M'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.npmignore',
      'gulpfile.js',
      'package.json',
      'readme.md',
      'index.js'
    ]);
  });
});
