var transformHelper = require('gulp-bundle-assets').transformHelper,
  browserify = require('browserify'),
  reactify = require('reactify'),
  sourceStream = require('vinyl-source-stream'),
  gutil = require('gulp-util'),
  isDebug = (process.env.NODE_ENV !== 'min');

var scriptStream = function (file, done) {
  browserify({
    entries: [file.path],
    debug: isDebug
  })
    .transform(reactify)
    .bundle()
    .on('error', function (err) {
      // make sure browserify errors don't break the pipe during watch: https://github.com/gulpjs/gulp/issues/259
      gutil.log(err.toString());
      this.emit('end');
    })
    .pipe(sourceStream('app.js'))
    .pipe(done);
};

module.exports = {
  bundle: {
    vendor: {
      styles: [
        {
          src: './bower_components/bootstrap/dist/css/bootstrap.css',
          minSrc: './bower_components/bootstrap/dist/css/bootstrap.min.css'
        }
      ],
      options: {
        minCSS: false,
        rev: ['min'],
        watch: {
          scripts: false,
          styles: false
        }
      }
    },
    main: {
      scripts: './src/public/scripts/app.js',
      styles: './src/public/styles/main.less',
      options: {
        uglify: ['min'],
        minCSS: ['min'],
        rev: ['min'],
        transforms: {
          styles: transformHelper.less(),
          scripts: transformHelper.browserify(scriptStream)
        },
        watch: {
          scripts: [
            './src/components/**/*.jsx',
            './src/public/**/*.js'
          ],
          styles: [
            './src/public/styles/**/*.less'
          ]
        }
      }
    }
  },
  copy: [
    {
      src: [
        './src/public/images/**'
      ],
      base: './src/public'
    },
    {
      src: './bower_components/bootstrap/dist/fonts/*',
      base: './bower_components/bootstrap/dist/',
      watch: false
    }
  ]
};
