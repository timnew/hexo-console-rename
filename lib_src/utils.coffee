module.exports = 
  log: (type, message) ->
    console.log "[#{type}]", message
  removeExt: (fullName, extName) ->
    fullName.substring(0, fullName.length - extName.length)
