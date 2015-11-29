module.exports = request

var nets = require('nets')
var set = require('lodash.set')

var Promise = require('./promise')

function request (options) {
  options.encoding = undefined

  return new Promise(function (resolve, reject) {
    set(options, 'headers.accept', 'application/vnd.api+json')
    set(options, 'headers.content-type', 'application/vnd.api+json')
    options.json = true
    if (options.body) {
      // works around an issue where nets-xhr stringifyies options.json
      // if it is set, which overides options.body
      options.json = options.body
    }
    nets(options, function (error, response) {
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    })
  })
}