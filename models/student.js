const mongoose = require('mongoose')
const path = require('path')

const attachedFileBasePath = 'uploads/attachedFiles'

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  preferredLanguage: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coverImage: {
    type: Buffer,
    // required: true,
  },
  coverImageType: {
    type: String,
  },
  attachedFileName: [],
})

studentSchema.virtual('attachedFilePath').get(function () {
  if (this.attachedFileName.length != 0) {
    return this.attachedFileName.map((element) => {
      console.log(element)
      return {
        source: path.join('/', attachedFileBasePath, element.fileName),
        name: element.originalName,
      }
    })
  }
})

studentSchema.virtual('coverImagePath').get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})

module.exports = mongoose.model('Student', studentSchema)
module.exports.attachedFileBasePath = attachedFileBasePath
