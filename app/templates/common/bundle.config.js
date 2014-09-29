var less = require('gulp-less'),
  lazypipe = require('lazypipe'),
  gif = require('gulp-if'),
  srcPath = './src/public';

function stringEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function isLessFile(file) {
  return stringEndsWith(file.relative, 'less');
}
var styleTransforms = lazypipe()
  .pipe(function () {
    return gif(isLessFile, less());
  });

module.exports = {
  bundle: {
    vendor: {
      scripts: [
        {
          src: './bower_components/jquery/dist/jquery.js',
          minSrc: './bower_components/jquery/dist/jquery.min.js'
        },
        {
          src: './bower_components/lodash/dist/lodash.js',
          minSrc: './bower_components/lodash/dist/lodash.min.js'
        }
      ],
      styles: [
        {
          src: './bower_components/bootstrap/dist/css/bootstrap.css',
          minSrc: './bower_components/bootstrap/dist/css/bootstrap.min.css'
        }
      ],
      options: {
        useMin: ['min'],
        rev: ['min'],
        watch: {
          scripts: false,
          styles: false
        }
      }
    },
    main: {
      scripts: srcPath + '/**/*.js',
      styles: srcPath + '/**/*.less',
      options: {
        uglify: ['min'],
        minCSS: ['min'],
        rev: ['min'],
        transforms: {
          styles: styleTransforms
        }
      }
    }
  },
  copy: [
    {
      src: [
          srcPath + '/images/**'
      ],
      base: srcPath
    },
    {
      src: './bower_components/bootstrap/dist/fonts/*',
      base: './bower_components/bootstrap/dist/',
      watch: false
    }
  ]
};
