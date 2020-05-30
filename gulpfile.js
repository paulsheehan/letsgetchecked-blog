var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
    console.log("Converting Sass into CSS");
    
    return gulp.src('public/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css/'))
});

gulp.task('watch', function() {
    gulp.watch('public/scss/**/*.scss', gulp.series('sass'));
});