var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jslint = require('gulp-jslint'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano');

var config = {
    sass: ['src/sass/*.scss'],
    js: ['src/js/*.js'],
    jsDest: './js',
    cssDest: './css'
};


gulp.task('styles', function () {
    var plugins = [
        autoprefixer({browsers: ['last 2 version']}),
        cssnano()
    ];
    return gulp.src(config.sass)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(config.cssDest));
});

gulp.task('scripts', ['jslint'], function () {
    return gulp.src(config.js)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(config.jsDest));
});

gulp.task('jslint', function () {
    return gulp.src(config.js)
        .pipe(jslint())
});

gulp.task('watch', function () {
    gulp.watch(config.sass, ['styles']);
    gulp.watch(config.js, ['scripts']);
});

gulp.task('default', ['styles', 'scripts']);

gulp.task('dev', ['default', 'watch']);