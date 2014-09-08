#!/usr/bin/env node
// NOTE: output is currently NOT displayed when script is run through bower scripts
// see https://github.com/bower/bower/issues/1484
console.log("Running command:");
console.log("git init && git config --global url.'https://'.insteadOf git://");

var spawn = require('child_process').spawn;

var config = spawn("git", ["config","--global","url.'https://'.insteadOf","git://"]);
config.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

config.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

config.on('close', function (code) {
  console.log('Finished git config. code ' + code);
});

var init = spawn("git", ["init"]);
init.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

init.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

init.on('close', function (code) {
  console.log('Finished git init. code ' + code);
});
