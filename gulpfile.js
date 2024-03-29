const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
const {parallel} = require('gulp');

const config = {
    srcCss: ['./docs/scss/main.scss'], buildCss: './docs/css'
};

function buildStyles() {
    return gulp.src(config.srcCss)
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: 'node_modules'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.buildCss))
}

function buildMinStyles() {
    return gulp.src(config.srcCss)
        .pipe(sass({includePaths: 'node_modules', outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest(config.buildCss))
}

function copyJavaScriptFiles() {
    return gulp.src([
        './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map'])
        .pipe(gulp.dest('./docs/js/vendor'))
}

function copyFontFiles() {
    return gulp.src([
        './node_modules/bootstrap-icons/font/*.css',
        './node_modules/bootstrap-icons/font/**//fonts/*.*',
    ]).pipe(gulp.dest('./docs/font'))
}

exports.default = parallel(buildStyles, buildMinStyles, copyJavaScriptFiles, copyFontFiles);
