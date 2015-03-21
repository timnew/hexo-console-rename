require('./context').hexo = hexo;

require('./monkey_patch');

var options = require('./options');

hexo.extend.console.register('rename', options.description, options, require('./command'));
