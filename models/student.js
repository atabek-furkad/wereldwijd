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
  attachment: [],
  dutchClass: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'DutchClass',
  },
  telNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  municipality: {
    type: String,
    // required: true,
  },
})

studentSchema.virtual('attachedFilePath').get(function () {
  if (this.attachment.length != 0) {
    return this.attachment.map((element) => {
      // console.log(element)
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
