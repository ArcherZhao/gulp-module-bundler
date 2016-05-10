var through = require("through2")
var gutil = require("gulp-util")
var minify = require('html-minifier').minify
var fs = require("fs")

module.exports = function (options) {
  return through.obj(function (file, enc, cb) {
    var baseArr = file.base.split(/\/|\\/)
    baseArr.pop()
    var contents = file.contents.toString(enc).replace(/require\((["'])([\.\w\d\/]+)\1\)/g, function(req, quote, rawUrl) {
      var urlArr = rawUrl.split("/")
      var fileName = urlArr[urlArr.length-1]
      if (fileName.split(".").length >= 2) {
        var suffix = fileName.split(".").pop()
      } else {
        return req
      }
      var url
      switch (urlArr[0]) {
        case ".." :
          baseArr.pop()
          for (var i = 1; i < urlArr.length; i++) {
            if (urlArr[i] == "..") {
              baseArr.pop()
            } else {
              baseArr.push(urlArr[i])
            }
          }
          url = baseArr.join("/")
          break;
        case "." :
          urlArr.shift()
          url = file.base + urlArr.join("/")
          break;
        default :
          new gutil.PluginError({
            plugin: 'module-bundler',
            message: 'unsupported url'
          });
      }
      gutil.log(url)
      if (url) {
        var text = fs.readFileSync(url, "utf8")
        switch (suffix) {
          case "html":
          case "ejs":
            text = minify(text, {collapseWhitespace:true})
            break;
          case "styl":
            var stylus = require('stylus')
            stylus.render(text, {compress: true}, function(err, css) {
               text = css
            })
            break;
          default:
            return req
        }
        return "\"" + text.replace(/"/g, "\\\"") + "\""
      } else {
        return req
      }
    });
    file.contents = new Buffer(contents, enc);
    cb(null, file, enc)
  });
};
