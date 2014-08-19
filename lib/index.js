(function() {
  var options;

  require('./monkey_patch');

  options = require('./options');

  hexo.extend.console.register('rename', options.description, options, require('./command'));

}).call(this);
