var gulp = require('gulp');

var concat      = require('gulp-concat');
var cssmin      = require('gulp-minify-css');
var del         = require('del');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');

var name = 'bootstrap-alignment';
var paths = {
  'bower': './bower_components',
  'dist': './dist',
  'sass': './src/sass'
};

var sass_options = {
  errLogToConsole: true,
  includePaths: [
    paths.sass,
    paths.bower + '/bootstrap-sass/assets/stylesheets'
  ]
}

gulp.task('clean', function(done) {
  del(paths.dist, done);
})

gulp.task('build', ['clean'], function() {
  gulp.src(paths.sass + '/bootstrap-alignment.scss')
    .pipe(sass(sass_options))
    .pipe(concat(name + '.css'))
    .pipe(gulp.dest(paths.dist))
    .pipe(cssmin())
    .pipe(rename(name + '.min.css'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['build']);

gulp.task('watch', ['default'], function() {
  gulp.watch(paths.sass + '**/*.scss', ['build']);
});