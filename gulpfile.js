var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
    console.log("Converting Sass into CSS");
    
    return gulp.src('public/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css/style.custom.css'))
});