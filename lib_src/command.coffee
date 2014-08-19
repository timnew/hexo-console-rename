colors = require('colors')
async = require('async')
glob = require("glob")
pathUtil = require('path')
moment = require('moment')
fs = require('graceful-fs')
{log, removeExt} = require('./utils')

fileUtil = hexo.util.file2
yfm = hexo.util.yfm
escape = hexo.util.escape
Permalink = hexo.util.permalink

createPermalink = (pattern) ->
  new Permalink pattern,
      segments:
            year: /(\d{4})/
            month: /(\d{2})/
            day: /(\d{2})/
            i_month: /(\d{1,2})/
            i_day: /(\d{1,2})/


permalink = createPermalink(hexo.config.new_post_name)
oldPermalink = permalink

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
        dirName = pathUtil.dirname(fullName)

        if oldPermalink.test(fullName)?
          date = moment(data.date)
          newName = permalink.stringify
              title: slug
              year: date.format('YYYY')
              month: date.format('MM')
              day: date.format('DD')
              i_month: date.format('M')
              i_day: date.format('D')
          newName = pathUtil.join(dirName, newName)
        else
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
     if err? and err != 'no asset folder'
       log 'error'.red, err

     callback(null)

command = (args, callback) ->
  oldPermalinkArg = args.p || args['old-permalink']
  oldPermalink = createPermalink(oldPermalinkArg) if oldPermalinkArg?

  async.each args._, expandPattern, callback

module.exports = command
