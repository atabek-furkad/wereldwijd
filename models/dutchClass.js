const mongoose = require('mongoose')

const dutchClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('DutchClass', dutchClassSchema)
