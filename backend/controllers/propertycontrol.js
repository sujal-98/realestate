const { Types } = require('mongoose');
const Property = require('../model/properties');
const Seller = require('../model/seller');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({ 
  cloud_name: process.env.cloudName, 
  api_key: process.env.cloudinaryKey, 
  api_secret: process.env.cloudinarySecret 
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, 
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([
  { name: 'propertyImages', maxCount: 10 },
  { name: 'adharCard', maxCount: 1 },
  { name: 'panCard', maxCount: 1 }
]);

// A MIME type (Multipurpose Internet Mail Extensions type) is a standard way
// to indicate the nature and format of a file or document. It is used in various internet protocols to specify the type of data being hand
// led, allowing the correct application or process to manage the data appropriately.
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images and PDFs Only!');
  }
}

router.post('/upload/:id', upload, async (req, res) => {
  const userId = req.params.id;
  const objectId = userId; 

  if (!req.files) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }

  const { description, type, location, price } = req.body;

  try {
    let seller = await Seller.findOne({ userId: objectId });
    if (!seller) {
      seller = new Seller({
        userId: objectId
      });
      await seller.save();
    }

    const uploadToCloudinary = (file, options) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        });
        uploadStream.end(file.buffer);
      });
    };

    const uploadPromises = [];

    if (req.files['propertyImages']) {
      req.files['propertyImages'].forEach(file => {
        uploadPromises.push(uploadToCloudinary(file, { resource_type: 'image', folder: 'property_images' }));
      });
    }

    const adharCardUrl = req.files['adharCard'] 
      ? await uploadToCloudinary(req.files['adharCard'][0], { resource_type: 'raw', folder: 'proof_of_ownership' }) 
      : null;

    const panCardUrl = req.files['panCard'] 
      ? await uploadToCloudinary(req.files['panCard'][0], { resource_type: 'raw', folder: 'proof_of_ownership' }) 
      : null;

    const uploadedImages = await Promise.all(uploadPromises);

    const newProperty = new Property({
      sellerId: seller._id,
      propertyImages: uploadedImages,
      description,
      type,
      location,
      price,
      adharCard: adharCardUrl,
      panCard: panCardUrl
    });

    const savedProperty = await newProperty.save();

    seller.properties.push(savedProperty._id);
    await seller.save();

    res.status(201).json(savedProperty);
  } catch (error) {
    console.error('Error uploading property:', error);
    res.status(500).json({ error: error.message });
  }
});

//fetch all properties route
router.get('/sale',async (req,res)=>{
  const type="selling"
  console.log(type)
  try{
    const property=await Property.find({type:`${type}`}).populate({
      path: 'sellerId',
      populate: {
        path: 'userId',
         select: 'username  profilePicture'
      }
    });
    console.log("Mai chala: ",property)
    res.status(200).send(property)
  }catch(error){
    console.log('Error occured: ',error)
    res.status(500).json({message:error.message})
  }
})
router.get('/rent',async (req,res)=>{
  const type="rental"
  console.log(type)
  try{
    const property=await Property.find({type:`${type}`}).populate({
      path: 'sellerId',
      populate: {
        path: 'userId',
         select: 'username  profilePicture'
      }
    });
    console.log("Mai chala: ",property)
    res.status(200).send(property)
  }catch(error){
    console.log('Error occured: ',error)
    res.status(500).json({message:error.message})
  }
})

//impression route
router.put('/impressions/:id',async (req,res)=>{
  const id=req.params.id
  try{
    const updated=await Property.findByIdAndUpdate(id,{$inc:{impressions:1}},{new:true})
    if(updated){
    res.status(200).json({message:"updated",new:updated})
  }
  else{
    res.status(201).json({message:"failed"})
  }
}catch(error){
  res.status(400).json({message:error.message})
}
})

 

module.exports = router;
