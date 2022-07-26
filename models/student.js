const mongoose = require('mongoose')
const path = require('path')

const coverImageBasePath = 'uploads/studentCovers'

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
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
  coverImageName: {
    type: String,
    // required: true,
  },
})

studentSchema.virtual('coverImagePath').get(function () {
  if (this.coverImageName != null) {
    return path.join('/', coverImageBasePath, this.coverImageName)
  }
})

module.exports = mongoose.model('Student', studentSchema)
module.exports.coverImageBasePath = coverImageBasePath
