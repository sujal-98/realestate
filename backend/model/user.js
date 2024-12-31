const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, sparse: true },
    bio: { type: String, default: '' }, 

        street: { type: String, default: '' },
        city: { type: String, default: '' }, 
        landmark: { type: String, default: '' } 
   ,
        
    dateOfBirth: { type: Date, default: '' }, 
    profilePicture: { type: String,
        default: '' },
    employment: { type: String, default: '' }, 
    contactedProps: { type: [mongoose.Schema.Types.ObjectId], ref: 'Seller', default: [] },
    savedProps: { type: [mongoose.Schema.Types.ObjectId], ref: 'Property', default: [] },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller',default:null },
    joiningDate: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
