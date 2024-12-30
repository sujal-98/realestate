const User = require('../model/user');
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
  { name: 'profilePic', maxCount: 1 },
]);

function checkFileType(file, cb) {
  const acceptedMIMETypes = /image\/jpeg|image\/jpg|image\/png|application\/pdf/;

  const extname = /jpeg|jpg|png|pdf/.test(path.extname(file.originalname).toLowerCase());
  const mimetype = acceptedMIMETypes.test(file.mimetype.toLowerCase());
  
  console.log(`File extension check: ${extname}, MIME type check: ${mimetype}`);
  console.log(`File mimetype received: ${file.mimetype}`);
  
  if (extname) {
    cb(null, true); 
  } else {
    cb(new Error('Error: Images and PDFs Only!')); 
  }
}


//fetching user's detail from its id
router.get('/account/:id', async (req, res) => { 
    const id = req.params.id; 
    console.log(id)
    try {
        const user = await User.findById(
            id
        ).exec();
        if (user) {
          console.log("check")
            console.log(user)
            console.log("profile picture: ",user.profilePicture)
            return res.status(200).send({ user,message: "User fetched successfully"});
        } else {
            return res.status(404).json({ message: "No user found" });
        }
    } catch (error) { 
        console.error(error); 
        return res.status(400).json({ message: "Error occurred", error: error.message }); 
    }
});



//for updating the user's data with id
router.put('/update/:id', upload ,async (req, res) => { 
    const id = req.params.id; 
    const updatedData = req.body; 
    console.log(id)
    console.log("updated data",updatedData);
    
    try {
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
      if (req.files && req.files['profilePic'] && req.files['profilePic'][0]) {
        console.log("Profile picture upload detected");
        const picUrl = await uploadToCloudinary(req.files['profilePic'][0], {
          resource_type: 'image',
          folder: 'profilePic'
        });
        updatedData.profilePicture = picUrl;
      }
  

        const user = await User.findByIdAndUpdate(
            id,
            updatedData,
            { new: true } 
        );
        if (user) {
          console.log("updated scene",user)
            return res.status(200).json({ userId: user._id,message: "User updated successfully", updatedUser: user });
        } else {
            return res.status(404).json({ message: "No user found" });
        }
    } catch (error) { 
        console.error(error); 
        return res.status(400).json({ message: "Error occurred", error: error.message }); 
    }
});

module.exports = router;
