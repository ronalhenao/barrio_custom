const   gulp = require('gulp'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        minifyCSS = require('gulp-clean-css'),
        sourcemaps = require('gulp-sourcemaps');
        pump = require('pump'),
        babel = require('gulp-babel'),
        concat = require('gulp-concat'),
        minify = require('gulp-minify'),
        server = require('gulp-server-livereload'),
        gcmq = require('gulp-group-css-media-queries');

const path_dest = {
    css: 'css'
};

//Server
gulp.task('server', () => {
    gulp.src('./')
        .pipe(server({
            port: 8000,
            livereload: true,
            open: true
        }));
});

//Sass
function css() {
  return gulp
        .src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'nested'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(path_dest.css));
};

// Gulp task to minify JavaScript files
function js() {
  return gulp.src(['js/libraries/*.js', 'js/global.js'])
    // Minify the file
    .pipe(minify({
        ext:{
            min:'.js'
        },
        ignoreFiles: ['.min.js']
    }))
    // Output
    .pipe(gulp.dest('js/dist'))
};

// Watch files
function watch() {
    gulp.watch("scss/**/*.scss", css);
    gulp.watch("js/*.js", js);
}

var build = gulp.parallel('server', css, js, watch);

gulp.task(build);

gulp.task('default', build);