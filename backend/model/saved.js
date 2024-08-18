const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  saved: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }]
});

module.exports = mongoose.model('Saved', savedSchema);
