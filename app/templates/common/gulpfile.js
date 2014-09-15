var gulp = require('gulp'),
  argv = require('yargs').argv,
  path = require('path'),
  spawn = require('child_process').spawn,
  srcPath = './src',
  srcPublicPath = srcPath + '/public',
  publicPath = './public',
  srcJs = [
      srcPath + '/lib/**/*.js',
      srcPath + '/models/**/*.js',
      srcPath + '/routes/**/*.js',
      srcPath + '/*.js'
  ],
  options = {
    paths: {
      lint: [
        './*.js'
      ].concat(srcJs),
      felint: [
          srcPublicPath + '/**/*.js'
      ],
      cover: [
        './server.js'
      ].concat(srcJs),
      test: [
        './test/**/*.js'
      ]
    },
    coverageSettings: {
      thresholds: {
        statements: 100,
        branches: 60,
        lines: 100,
        functions: 100
      }
    }
  };

require('load-common-gulp-tasks')(gulp, options);

// do a clean and build when first starting up
gulp.task('develop', 'Watch and restart server on change', function (cb) {
  require('run-sequence')('build',
    ['nodemon', 'watch'],
    cb);
}, {
  options: {
    'debug': 'Start in debug mode'
  }
});

gulp.task('nodemon', false, function (cb) {
  var nodemon = require('gulp-nodemon');
  var bunyan = spawn('node', [path.join(__dirname, 'node_modules/bunyan/bin/bunyan')], { stdio: ['pipe', process.stdout, process.stderr] });

  var nodemonOpts = {
    script: 'server.js',
    ext: 'dust js',
    ignore: [ // only watch server files
      'bower_components/*',
      'node_modules/*',
      'public/*',
      'src/public/*'
    ],
    stdout: false
  };
  if (argv.debug) {
    nodemonOpts.nodeArgs = ['--debug'];
  }
  nodemon(nodemonOpts)
    .on('restart', function () {
      var d = new Date();
      console.log(require('gulp-util').colors.bgBlue('server restarted at ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()));
    })
    .on('readable', function() {
      this.stdout.pipe(bunyan.stdin);
      this.stderr.pipe(bunyan.stdin);
    });
  cb();
});

gulp.task('clean', 'Clean all assets out of /public', function () {
  return gulp.src([publicPath + '/*'], {read: false})
    .pipe(require('gulp-rimraf')());
});

gulp.task('watch', 'Watch assets and build on change', function (cb) {
  var livereload = require('gulp-livereload'),
    server = livereload();
  gulp.watch([srcPublicPath + '/**/*.*'], ['bundle']); // only watch client files
  gulp.watch([publicPath + '/**/*.*']).on('change', function (file) {
    server.changed(file.path);
  });
  cb();
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