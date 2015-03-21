var util = require('hexo-util');

// Fixing issue in Hexo, and submitted the pull-request
var FILE_NAME_ESCAPE_REGEX = /[\s~`!@#\$%\^&\*\(\)\-_\+=\[\]\{\}\|\\;:"'<>,\.\?\/]/g;
var CONTINUES_DASH_REGEX = /-{1,}/g;
var TAIL_DASH_REGEX = /-+$/;

util.escapeFilename = function(str, transform){
  var result = util.escapeDiacritic(str.toString())
    .replace(FILE_NAME_ESCAPE_REGEX, '-')
    .replace(CONTINUES_DASH_REGEX, '-')
    .replace(TAIL_DASH_REGEX, '');

  transform = parseInt(transform, 10);

  if (transform === 1) {
    result = result.toLowerCase();
  } else if (transform === 2){
    result = result.toUpperCase();
  }

  return result;
};

util.escapePath = function(str, transform){
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
