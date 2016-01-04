'use strict'

var fs = require('fs')
var uuid = require('uuid')
var createDocument = require('../lib/create-document')

function showFrontpage (request, reply) {
  reply({
    message: 'Only POST is supported'
  })
}

function handleUpload (request, reply) {
  var data = request.payload
  if (data.file) {
    var nameArray = data.file.hapi.filename.split('.')
    var newNameConverted = nameArray.join('.') + '.formatted.docx'
    var temporaryName = uuid.v4()
    var pathPre = process.cwd() + '/uploads/' + temporaryName
    var fileNameTempOriginal = pathPre + '.original.docx'
    var fileNameTempConverted = pathPre + '.formatted.docx'
    var file = fs.createWriteStream(fileNameTempOriginal)

    file.on('error', function (error) {
      reply(error)
    })

    data.file.pipe(file)

    file.on('finish', function (err) {
      if (err) {
        reply(err)
      } else {
        delete data['file']
        var options = {
          templateFilePath: fileNameTempOriginal,
          templateData: data,
          docFilePath: fileNameTempConverted
        }
        createDocument(options, function (err, result) {
          if (err) {
            reply(err)
          } else {
            console.log(result)
            reply.file(fileNameTempConverted, {
              filename: newNameConverted
            }).on('finish', function () {
              fs.unlink(fileNameTempOriginal)
              fs.unlink(fileNameTempConverted)
            })
          }
        })
      }
    })
  }
}

module.exports.showFrontpage = showFrontpage

module.exports.handleUpload = handleUpload
