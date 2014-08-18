(function() {
  module.exports = {
    log: function(type, message) {
      return console.log("[" + type + "]", message);
    },
    removeExt: function(fullName, extName) {
      return fullName.substring(0, fullName.length - extName.length);
    }
  };

}).call(this);
