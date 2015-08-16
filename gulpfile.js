var gulp = require('gulp'), 
  sass = require('gulp-sass') 
  notify = require("gulp-notify") 
  bower = require('gulp-bower');
  mainBowerFiles = require('main-bower-files');

var config = {
  sassDir: './src/sass',
  bowerDir: './bower_components' ,
  outDir: './public'
}

gulp.task('bower', function() { 
  return bower()
    .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('fonts', function() { 
  return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
    .pipe(gulp.dest(config.outDir + '/fonts')); 
});

gulp.task('js', function() { 
  return gulp.src(config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.min.js') 
    .pipe(gulp.dest(config.outDir + '/js')); 
});

gulp.task('css', function() { 
  return gulp.src(config.sassDir + '/style.scss')
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: [
      config.sassDir,
      config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
      config.bowerDir + '/fontawesome/scss',
    ]
  }) 
  .on("error", notify.onError(function (error) {
    return "Error: " + error.message;
  }))) 
  .pipe(gulp.dest(config.outDir + '/css')); 
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
  gulp.watch(config.sassDir + '/**/*.scss', ['css']); 
});

// Default tasks
gulp.task('default', ['bower', 'css', 'js']);
