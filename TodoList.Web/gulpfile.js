// Include Gulp
var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var dest = 'dist/';

// Default Task
gulp.task('default', ['js', 'css']);

gulp.task('js', function () {

    var jsFiles = ['app/**/*.js'];

    gulp.src(plugins.mainBowerFiles().concat(jsFiles))
        .pipe(plugins.filter('*.js'))
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dest + 'js'));

});

gulp.task('css', function () {

    gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('*.css'))
        .pipe(plugins.order([
            'normalize.css',
            '*'
        ]))
        .pipe(plugins.concat('main.css'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dest + 'css'));

});