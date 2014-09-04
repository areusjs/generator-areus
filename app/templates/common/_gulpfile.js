var gulp = require('gulp'),
  srcClientPath = './src/client',
  srcSrvPath = './src/server',
  publicPath = './public',
  options = {
    paths: {
      lint: [
          srcSrvPath + '/**/*.js'
      ],
      felint: [
          srcClientPath + '/**/*.js'
      ],
      cover: [
          srcSrvPath + '/**/*.js'
      ],
      test: [
        './test/**/*.js'
      ]
    }
  };

require('load-common-gulp-tasks')(gulp, options);

// do a clean and build when first starting up
gulp.task('develop', 'Watch and restart server on change', ['build', 'watch'], function () {
  var nodemon = require('gulp-nodemon');
  nodemon({
    script: 'bin/www',
    ext: 'html js',
    ignore: [ // only watch server files
      'bower_components/*',
      'node_modules/*',
      'public/*',
      'src/client/*'
    ]
  })
    .on('change', ['ci-watch'])
    .on('restart', function () {
      var d = new Date();
      console.log(require('gulp-util').colors.bgBlue('server restarted at ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()));
    });
});

gulp.task('clean', 'Clean all assets out of /public', function () {
  return gulp.src([publicPath + '/*'], {read: false})
    .pipe(require('gulp-rimraf')());
});

gulp.task('watch', 'Watch assets and build on change', function () {
  var livereload = require('gulp-livereload'),
    server = livereload();
  gulp.watch([srcClientPath + '/**/*.*'], ['bundle']); // only watch client files
  gulp.watch([publicPath + '/**/*.*']).on('change', function (file) {
    server.changed(file.path);
  });
});

function bundle() {
  var gbundle = require('gulp-bundle-assets');
  return gulp.src('./bundle.config.js')
    .pipe(gbundle())
    .pipe(gbundle.results({
      dest: './',
      pathPrefix: '/public/'
    }))
    .pipe(gulp.dest(publicPath));
}

gulp.task('bundle', 'Builds all static files', function () {
  return bundle();
});

gulp.task('build', 'Cleans and builds all static files', ['clean'], function () {
  return bundle();
});
