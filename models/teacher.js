const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dutchClass: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'DutchClass',
  },
})

module.exports = mongoose.model('Teacher', teacherSchema)
