const mongoose = require('mongoose')

const dutchClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Teacher',
  },
})

module.exports = mongoose.model('DutchClass', dutchClassSchema)
