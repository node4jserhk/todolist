var gulp = require('gulp');
var browserify = require('gulp-browserify');


gulp.task('default', function() {
  gulp.src('public/javascripts/todo.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('public/javascripts/build'))

});
