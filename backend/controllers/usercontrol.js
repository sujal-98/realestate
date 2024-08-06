const User = require('../model/user');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'dvbjobvcn', 
    api_key: '883783879313788', 
    api_secret: '20oHp1x-Drtx14xlvupgFssKauM' 
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
  


//fetching user's detail from its id
router.get('/account/:id', async (req, res) => { 
    const id = req.params.id; 
    console.log(id)
    try {
        const user = await User.findOne(
            { _id: id }
        );
        if (user) {
            console.log(user)
            return res.status(200).send({ user,message: "User fetched successfully"});
        } else {
            return res.status(404).json({ message: "No user found" });
        }
    } catch (error) { 
        console.error(error); 
        return res.status(400).json({ message: "Error occurred", error: error.message }); 
    }
});

module.exports = router;


//for updating the user's data with id
router.put('/account/:id', async (req, res) => { 
    const id = req.params.id; 
    const updatedData = req.body; 
    console.log(updatedData);

    try {
        const user = await User.findOneAndUpdate(
            { user_id: id },
            updatedData,
            { new: true } 
        );
        if (user) {
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
