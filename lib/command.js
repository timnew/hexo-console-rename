(function() {
  var Permalink, async, colors, command, escape, expandPattern, fileUtil, fs, glob, log, pathUtil, permalink, processFile, removeExt, yfm, _ref;

  colors = require('colors');

  async = require('async');

  glob = require("glob");

  pathUtil = require('path');

  fs = require('graceful-fs');

  _ref = require('./utils'), log = _ref.log, removeExt = _ref.removeExt;

  fileUtil = hexo.util.file2;

  yfm = hexo.util.yfm;

  escape = hexo.util.escape;

  Permalink = hexo.util.permalink;

  permalink = new Permalink(hexo.config.new_post_name);

  expandPattern = function(pattern, callback) {
    return async.waterfall([
      function(callback) {
        return glob(pattern, callback);
      }, function(files, callback) {
        return async.each(files, processFile, callback);
      }
    ], callback);
  };

  processFile = function(fullName, callback) {
    log('find'.cyan, fullName);
    return async.waterfall([
      function(callback) {
        return fs.exists(fullName, function(exists) {
          if (exists) {
            return callback(null);
          } else {
            return callback("File " + fullName.yellow + " is not found");
          }
        });
      }, function(callback) {
        return fileUtil.readFile(fullName, callback);
      }, function(content, callback) {
        var assetFolder, data, dirName, extName, nameParts, newAssetFolder, newName, oldName, slug;
        data = yfm.parse(content);
        slug = escape.filename(data.title, hexo.config.filename_case);
        extName = pathUtil.extname(fullName);
        nameParts = permalink.parse(fullName);
        if (nameParts != null) {
          nameParts.title = slug;
          newName = permalink.stringify(nameParts);
        } else {
          dirName = pathUtil.dirname(fullName);
          oldName = pathUtil.basename(fullName, extName);
          newName = pathUtil.join(dirName, slug + extName);
        }
        assetFolder = removeExt(fullName, extName);
        newAssetFolder = removeExt(newName, extName);
        if (fullName === newName) {
          return callback();
        }
        return async.auto({
          renameFile: function(callback) {
            log('rename'.cyan, "" + fullName.red + " -> " + newName.green);
            return fs.rename(fullName, newName, callback);
          },
          assetFolderStat: function(callback) {
            var assetFolderName;
            assetFolderName = fullName.substring(0, fullName.length - extName.length);
            return fs.exists(assetFolderName, function(exists) {
              if (!exists) {
                callback('no asset folder');
              }
              return fs.stat(assetFolderName, callback);
            });
          },
          renameAssetFolder: [
            'assetFolderStat', function(callback, result) {
              if (!result.assetFolderStat.isDirectory()) {
                callback('no asset folder');
              }
              log('rename'.cyan, "" + assetFolder.red + " -> " + newAssetFolder.green);
              return fs.rename(assetFolder, newAssetFolder, callback);
            }
          ]
        }, callback);
      }
    ], function(err) {
      if (err != null) {
        log('error'.red, err);
      }
      return callback(null);
    });
  };

  command = function(args, callback) {
    return async.each(args._, expandPattern, callback);
  };

  module.exports = command;

}).call(this);
