const mongoose = require('mongoose')

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
    required: true,
  },
})

module.exports = mongoose.model('Student', studentSchema)
module.exports.coverImageBasePath = coverImageBasePath
