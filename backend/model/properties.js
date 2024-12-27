const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  adharCard: {
    type: String,
    required: true,
  },
  panCard: {
    type: String,
    required: true,
  },
  propertyImages: [{
    type: String,
    required: true,
  }],
  
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  
  datePosted: {
    type: Date,
    default: Date.now,
    required: true,
    immutable: true,
  },
  impressions: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: ['rental', 'selling'],
    required: true,
  },
  location: {
    state:{
    type: String,
    required: true,
  
},
city:{
  type: String,
  required: true,

},
 address:{
  type: String,
  required: true,

},
latitude:{
  type:Number,
  required:true,
},
longitude:{
  type:Number,
  required:true
}

},
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'rented'],
    default: 'available',
  },
  yearBuilt:{
    type:Number,
    required:true
  }
  ,
  amenities: {
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    parking: { type: Number, required:true },
    area: { type: Number, required:true },
    balcony: { type: Number, default: 0 },
  },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
