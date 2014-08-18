(function() {
  var options;

  options = require('./options');

  hexo.extend.console.register('rename', options.description, options, require('./command'));

}).call(this);
