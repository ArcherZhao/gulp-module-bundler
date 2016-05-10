# gulp-module-bundler
A gulp plugin for bundle up the html files, css files and javascript file

一个用来把html、css等文本文件打包放进js文件的gulp插件

## Install
    npm install --save-dev gulp-module-bundler

## Example
#### gulpfile.js
    var bundler = require('gulp-module-bundler');
    gulp.task('module', function() {
      return gulp.src('./module/module.js')
      .pipe(bundler())
      .pipe(gulp.dest('./dist/'));
    });

#### module/module.js
    const template = require("./template.ejs")
    const style = require("./style.styl")
    ...

## Intro
样式和模板文件会以字符串的形式插入到js代码中的对应的位置

## Notice
Only support `.html` `ejs` `.styl` files now.
