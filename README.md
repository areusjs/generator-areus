# generator-tesla

Opinionated scaffolding tool for quickly generating a new [express.js](http://expressjs.com/) app with logical defaults.
The major architecture pieces include:

1. [express.js](http://expressjs.com/) - routing
1. [dustjs](http://linkedin.github.io/dustjs/) - view engine
1. [gulp.js](http://gulpjs.com/) - task manager
1. [bunyan](https://github.com/trentm/node-bunyan) - logging
1. [nconf](https://github.com/flatiron/nconf) - configuration

## Install

Requires [node.js and npm](http://nodejs.org/download/)

```bash
npm config set registry http://registry.npm.wsjfdev.dowjones.net/
npm install -g yo generator-tesla
```

## Usage: App

`cd` into the directory where you are going to generate your new app and then initiate the generator:

```bash
yo tesla
```

Once generation is complete, open the generated `readme.md` for instructions on how to use the app.

## Usage: Module

Generates a new *shared* module to be published to the npm registry and shared between apps.

`cd` into the directory where you are going to generate your new module and then initiate the generator:

```bash
yo tesla:module
```

Once generation is complete, you can reference it in your app locally using [`npm link`](https://www.npmjs.org/doc/cli/npm-link.html). 

Once the module is ready, you can publish it to our internal npm registry using the following build `execute shell` step in jenkins:

```bash
date
npm install . --color always
date
npm test
date
tesla-release show-version
tesla-release release-only-dev
date
```