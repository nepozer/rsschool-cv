const { src, dest, watch, parallel, series } = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const tailwindcss = require('tailwindcss')
const postcss = require('gulp-postcss')

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();

function styles() {
    return src('page/scss/main.scss')

        .pipe(autoPrefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('main.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
        .pipe(postcss(tailwindcss))
        .pipe(dest('page/css'))
        .pipe(browserSync.stream());
}


function scripts() {
    return src('page/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('page/js'))
        .pipe(browserSync.stream());
}

function watching() {
    watch(['page/scss/main.scss'], styles);
    watch(['page/js/main.js'], scripts);
    watch(['page/*.html']).on('change', browserSync.reload);
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "page/"
        }
    });
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function build() {
    return src([
        'page/css/main.min.css',
        'page/js/main.min.js',
        'page/**/*.html'
    ], { base: 'page' })
        .pipe(dest('dist'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = series(cleanDist, build)


exports.default = parallel(styles, scripts, browsersync, watching)