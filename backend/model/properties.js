const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
   sellerId:{
    type: Schema.Types.ObjectId,
    ref: 'Seller'
   } ,
  propertyImages: [{
    type: String, 
    required: true
  }],
  mainImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  datePosted: {
    type: Date,
    default: Date.now,
    required: true,
    immutable:true
  },
  impressions: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    enum: ['rental', 'selling'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Property', propertySchema);
