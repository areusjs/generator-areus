# <%= _.slugify(applicationName) %> <% if (isPublic) { %>[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

## Install

```bash
$ npm install <%= _.slugify(applicationName) %> --save
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Chris Montgomery](http://www.chrismontgomery.info/)

[npm-url]: https://npmjs.org/package/<%= _.slugify(applicationName) %>
[npm-image]: http://img.shields.io/npm/v/<%= _.slugify(applicationName) %>.svg
[travis-image]: https://travis-ci.org/chmontgomery/<%= _.slugify(applicationName) %>.svg?branch=master
[travis-url]: https://travis-ci.org/chmontgomery/<%= _.slugify(applicationName) %>
<%}%>