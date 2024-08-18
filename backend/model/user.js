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
     }, 
    employment: { type: String, default: '' }, 
    contactedProps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }],
    savedProps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
    joiningDate: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
