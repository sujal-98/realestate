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
  }],

  notifications:[
    {
      sub: {
        type:String,
        required:true
      },
      msg:{
        type:String,
        required:true
        },
        date:{
          type:Date,
          default:Date.now
          }
        ,
        read:{
          type:Boolean,
          default:false
          },
        senderId:{
          type:Schema.Types.ObjectId,
          ref:'User',
          required:true
        }

          }
          ],
  
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
