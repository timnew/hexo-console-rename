colors = require('colors')
async = require('async')
glob = require("glob")
pathUtil = require('path')
fs = require('graceful-fs')
{log, removeExt} = require('./utils')

fileUtil = hexo.util.file2
yfm = hexo.util.yfm
escape = hexo.util.escape
Permalink = hexo.util.permalink

permalink = new Permalink(hexo.config.new_post_name);

expandPattern = (pattern, callback) ->
  async.waterfall [
    (callback) ->
      glob pattern, callback
    (files, callback) ->
      async.each files, processFile, callback
  ], callback

processFile = (fullName, callback) ->
   log 'find'.cyan, fullName
   async.waterfall [
     (callback) ->
        fs.exists fullName, (exists) ->
          if exists
            callback(null)
          else
            callback("File #{fullName.yellow} is not found")
     (callback) ->
       fileUtil.readFile fullName, callback
     (content, callback) ->
        data = yfm.parse content
        slug = escape.filename(data.title, hexo.config.filename_case)

        extName = pathUtil.extname(fullName)
        nameParts = permalink.parse(fullName)

        if nameParts?
          nameParts.title = slug
          newName = permalink.stringify(nameParts)
        else
          dirName = pathUtil.dirname(fullName)
          oldName = pathUtil.basename(fullName, extName)

          newName = pathUtil.join(dirName, slug + extName)

        assetFolder = removeExt(fullName, extName)
        newAssetFolder = removeExt(newName, extName)

        return callback() if fullName == newName

        async.auto
          renameFile: (callback) ->
            log 'rename'.cyan, "#{fullName.red} -> #{newName.green}"
            fs.rename fullName, newName, callback
          assetFolderStat: (callback) ->
            assetFolderName = fullName.substring(0, fullName.length - extName.length)

            fs.exists assetFolderName, (exists) ->
              callback('no asset folder') unless exists

              fs.stat assetFolderName, callback
          renameAssetFolder: ['assetFolderStat', (callback, result) ->
            callback('no asset folder') unless result.assetFolderStat.isDirectory()

            log 'rename'.cyan, "#{assetFolder.red} -> #{newAssetFolder.green}"
            fs.rename assetFolder, newAssetFolder, callback
          ]
        , callback
   ], (err) ->
     if err?
       log 'error'.red, err

     callback(null)

command = (args, callback) ->
  async.each args._, expandPattern, callback

module.exports = command
