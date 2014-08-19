// Fixing issue in Hexo, and submitted the pull-request 

var escape = hexo.util.escape;

var FILE_NAME_ESCAPE_REGEX = /[\s~`!@#\$%\^&\*\(\)\-_\+=\[\]\{\}\|\\;:"'<>,\.\?\/]/g;
var CONTINUES_DASH_REGEX = /-{2,}/g;

escape.filename = function(str, transform){
  var result = escape.diacritic(str.toString())
    .replace(FILE_NAME_ESCAPE_REGEX, '-')
    .replace(CONTINUES_DASH_REGEX, '-');

  transform = parseInt(transform, 10);

  if (transform === 1) {
    result = result.toLowerCase();
  } else if (transform === 2){
    result = result.toUpperCase();
  }

  return result;
};

escape.path = function(str, transform){
  var result = str.toString()
    .replace(FILE_NAME_ESCAPE_REGEX, '-')
    .replace(CONTINUES_DASH_REGEX, '-');

  transform = parseInt(transform, 10);

  if (transform === 1) {
    result = result.toLowerCase();
  } else if (transform === 2){
    result = result.toUpperCase();
  }

  return result;
};

module.exports = escape;
