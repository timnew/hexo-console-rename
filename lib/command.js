(function() {
  var Permalink, async, colors, command, createPermalink, escape, expandPattern, fileUtil, fs, glob, log, moment, oldPermalink, pathUtil, permalink, processFile, removeExt, yfm, _ref;

  colors = require('colors');

  async = require('async');

  glob = require("glob");

  pathUtil = require('path');

  moment = require('moment');

  fs = require('graceful-fs');

  _ref = require('./utils'), log = _ref.log, removeExt = _ref.removeExt;

  fileUtil = hexo.util.file2;

  yfm = hexo.util.yfm;

  escape = hexo.util.escape;

  Permalink = hexo.util.permalink;

  createPermalink = function(pattern) {
    return new Permalink(pattern, {
      segments: {
        year: /(\d{4})/,
        month: /(\d{2})/,
        day: /(\d{2})/,
        i_month: /(\d{1,2})/,
        i_day: /(\d{1,2})/
      }
    });
  };

  permalink = createPermalink(hexo.config.new_post_name);

  oldPermalink = permalink;

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
        var assetFolder, data, date, dirName, extName, newAssetFolder, newName, oldName, slug;
        data = yfm.parse(content);
        slug = escape.filename(data.title, hexo.config.filename_case);
        extName = pathUtil.extname(fullName);
        dirName = pathUtil.dirname(fullName);
        if (oldPermalink.test(fullName) != null) {
          date = moment(data.date);
          newName = permalink.stringify({
            title: slug,
            year: date.format('YYYY'),
            month: date.format('MM'),
            day: date.format('DD'),
            i_month: date.format('M'),
            i_day: date.format('D')
          });
          newName = pathUtil.join(dirName, newName);
        } else {
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
      if ((err != null) && err !== 'no asset folder') {
        log('error'.red, err);
      }
      return callback(null);
    });
  };

  command = function(args, callback) {
    var oldPermalinkArg;
    oldPermalinkArg = args.p || args['old-permalink'];
    if (oldPermalinkArg != null) {
      oldPermalink = createPermalink(oldPermalinkArg);
    }
    return async.each(args._, expandPattern, callback);
  };

  module.exports = command;

}).call(this);
