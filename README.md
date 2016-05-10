# gulp-module-bundler
A gulp plugin for bundle up the html files, css files and javascript file
一个用来把html、css等文本文件打包放进js文件的gulp插件

## Install
    npm install --save-dev gulp-module-bundler

## Usage
    var bundler = require('gulp-module-bundler');
    gulp.task('module', function() {
      return gulp.src('./lib/module.js')
      .pipe(bundler())
      .pipe(gulp.dest('./dist/'));
    });
