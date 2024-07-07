const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  properties: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
