const mongoose = require('mongoose')

const classPresenceSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dutchClass: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'DutchClass',
  },
  presenceList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Student',
    },
  ],
})

module.exports = mongoose.model('ClassPresence', classPresenceSchema)
