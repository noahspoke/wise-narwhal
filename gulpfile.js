var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var bify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
	return console.log("Hello Friends!");
});

gulp.task('jsFix', function() {
	bify({entries: './assets/javascripts/app.js', debug: true })
	.bundle()
	.pipe(source('build.min.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('./public/javascripts'));
});

gulp.task('cssFix', function() {
	gulp.src(['./assets/stylesheets/sass/*.scss', './node_modules/sweetalert/dist/sweetalert.css'])
		.pipe(sass().on('error', sass.logError))
		.pipe(concatCss('build.css'))
		.pipe(cleanCss())
		.pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', ['cssFix', 'jsFix'], function() {
	gulp.watch('./assets/stylesheets/sass/*.scss', ['cssFix']);
	gulp.watch('./assets/javascripts/*.js', ['jsFix']);
});