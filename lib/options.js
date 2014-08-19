(function() {
  var options;

  module.exports = options = {
    alias: 'r',
    description: 'Rename the file according to its title',
    usage: '[options] <file|glob> [file|glob] ...',
    arugments: [
      {
        name: '-p, --old-permalink',
        desc: 'permalink pattern to be migrated'
      }
    ]
  };

}).call(this);
