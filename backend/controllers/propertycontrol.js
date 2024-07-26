const { Types } = require('mongoose');
const Property = require('../model/properties');
const Seller = require('../model/seller');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

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

router.post('/upload/:id', (req, res) => {
  const userId = req.params.id;
  const objectId = userId; 

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    console.log('Files received:', req.files);
    console.log("Body Received: ", req.body);
    const { description, type, location, price } = req.body;

    const propertyImages = req.files['propertyImages'] ? req.files['propertyImages'].map(file => file.path) : [];
    const adharCard = req.files['adharCard'] ? req.files['adharCard'][0].path : null;
    const panCard = req.files['panCard'] ? req.files['panCard'][0].path : null;

    try {
      let seller = await Seller.findOne({ userId: objectId });
      if (!seller) {
        seller = new Seller({
          userId: objectId
        });
        await seller.save();
      }

      const newProperty = new Property({
        sellerId: seller._id,
        propertyImages,
        description,
        type,
        location,
        price,
        adharCard,
        panCard
      });

      const savedProperty = await newProperty.save();

      seller.properties.push(savedProperty._id);
      await seller.save();

      res.status(201).json(savedProperty);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

module.exports = router;
