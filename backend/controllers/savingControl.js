const { Types } = require('mongoose');
const Property = require('../model/properties');
const User = require('../model/user');
const Saved = require('../model/saved');
const express = require('express');
const router = express.Router();

// Add route
router.post('/add/:id', async (req, res) => {
    const userId = req.params.id;
    const { propId } = req.body;
    
    try {
        // Find the saved properties document for the user
        let savedProperties = await Saved.findOne({ userId }).exec();
        
        if (savedProperties) {
            // Check if the property ID is already in the saved array
            if (!savedProperties.saved.includes(Types.ObjectId(propId))) {
                savedProperties.saved.push(Types.ObjectId(propId));
                await savedProperties.save();
                res.status(200).json({ message: 'Property added to saved properties' });
            } else {
                res.status(400).json({ message: 'Property already saved' });
            }
        } else {
            // Create a new saved properties document
            const newSavedProperties = new Saved({
                userId: Types.ObjectId(userId),
                saved: [Types.ObjectId(propId)]
            });
            await newSavedProperties.save();
            res.status(200).json({ message: 'Property added to saved properties', newSavedProperties });
        }
    } catch (error) {
        console.log("error occurred:", error);
        res.status(400).json({ message: error.message });
    }
});

// Remove a property
router.put('/remove/:id', async (req, res) => {
    const { propId } = req.body;
    const userId = req.params.id;
    
    try {
        const savedProperties = await Saved.findOne({ userId }).exec();
        
        if (savedProperties) {
            const index = savedProperties.saved.indexOf(Types.ObjectId(propId));
            if (index > -1) {
                savedProperties.saved.splice(index, 1); 
                await savedProperties.save();
                res.status(200).json({ message: 'Property removed from saved properties' });
            } else {
                res.status(400).json({ message: 'Property not found in saved properties' });
            }
        } else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        console.log("error occurred:", error);
        res.status(400).json({ message: error.message });
    }
});

// Get saved properties
router.get('/getSaved/:id', async (req, res) => {
    const userId = req.params.id;
    
    try {
        const savedProperties = await Saved.findOne({ userId }).exec();
        
        if (savedProperties) {
            res.status(200).json(savedProperties.saved);
        } else {
            res.status(400).json({ message: "Not Found" });
        }
    } catch (error) {
        console.log("error occurred:", error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
