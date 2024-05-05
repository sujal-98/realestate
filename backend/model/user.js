const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    phone:{type:String,unique:true },
    address: {
        street: { type: String },
        city: { type: String },
        country: { type: String }
    },
    dateOfBirth: { type: Date },
    profilePicture: { type: Buffer },
    employement:{type:String}
},{timestamps:true})

module.exports=mongoose.model('User',userSchema)