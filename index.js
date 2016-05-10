var through = require("through2")
var gutil = require("gulp-util")
var fs = require("fs")

module.exports = function (options) {
  return through.obj(function (file, enc, cb) {
    var contents = file.contents.toString(enc)
    contents.replace(/require\((["'])([\.\w\d\/]+)\1\)/g, function(req, quote, url) {
      fs.readFileSync(url, "utf8", callback)
    });
  });
};
