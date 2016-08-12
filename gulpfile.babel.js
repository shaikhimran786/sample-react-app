import gulp from 'gulp';
import del from 'del';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpIf from 'gulp-if';
import uglify from 'gulp-uglify';
import webserver from 'gulp-webserver';

let paths = {
    html: [
        'src/index.html'
    ],
    scripts: 'src/app.jsx',
    dest: 'build'
};


function isProduction() {
    console.log('process.env', process.env['NODE_ENV'])
    return process.env['NODE_ENV'] === 'production';
}

gulp.task('clean_html', (callback) => {
    del(['build/*.html'], callback);
});


gulp.task('html', ['clean_html'], () => {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dest));
});


gulp.task('clean_scripts', (callback) => {
    del(['build/*.js'], callback);
});


gulp.task('scripts', ['clean_scripts'], () => {
    return browserify({
        entries: paths.scripts,
        extensions: ['.jsx'],
        debug: !isProduction()
    })
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulpIf(isProduction, uglify()))
        .pipe(gulp.dest(paths.dest))
});


/*
 * Run the server.
 */
gulp.task('server', () => {
    return gulp.src(paths.dest)
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['html', 'scripts', 'server']);
