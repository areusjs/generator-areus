# generator-areus [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

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
npm install -g yo generator-areus
```

## Usage: App

`cd` into the directory where you are going to generate your new app and then initiate the generator:

```bash
yo areus
```

Once generation is complete, open the generated `readme.md` for instructions on how to use the app.

## Usage: Module

Generates a new *shared* module to be published to the npm registry and shared between apps.

`cd` into the directory where you are going to generate your new module and then initiate the generator:

```bash
yo areus:module
```

Once generation is complete, you can reference it in your app locally using [`npm link`](https://www.npmjs.org/doc/cli/npm-link.html).

## License

[MIT](http://opensource.org/licenses/MIT)

[npm-url]: https://npmjs.org/package/generator-areus
[npm-image]: http://img.shields.io/npm/v/generator-areus.svg
[travis-image]: https://travis-ci.org/areusjs/generator-areus.svg?branch=master
[travis-url]: https://travis-ci.org/areusjs/generator-areus