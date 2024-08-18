const { Types } = require('mongoose');
const Property = require('../model/properties');
const User = require('../model/user');
const Saved = require('../model/saved');
const express = require('express');
const router = express.Router();

// Add route
router.post('/add/:id', async (req, res) => {

    console.log("adding")
    const userId = req.params.id;
    const { propId } = req.body;
    console.log("userid",userId)
    console.log("propertyid",propId)
    try {
        // Find the saved properties document for the user
        let savedProperties = await Saved.findOne({ userId }).exec();
        
        if (savedProperties) {
            // Check if the property ID is already in the saved array
            if (!savedProperties.saved.includes(propId)) {
                savedProperties.saved.push(propId);
                await savedProperties.save();
                await savedProperties.populate('saved').execPopulate();

                res.status(200).json({ message: 'Property added to saved properties'.savedProperties });
            } else {
                res.status(400).json({ message: 'Property already saved' });
            }
        } else {
            // Create a new saved properties document
            const newSavedProperties = new Saved({
                userId: userId,
                saved: [propId]
            });
            await newSavedProperties.save();
            await newSavedProperties.populate('saved').execPopulate();

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
    console.log("User id", userId)
    console.log("property id", propId)
    try {
        const savedProperties = await Saved.findOne({ userId:userId }).exec();
        
        if (savedProperties) {
            const index = savedProperties.saved.indexOf(propId);
            if (index > -1) {
                savedProperties.saved.splice(index, 1); 
                await savedProperties.save();
                await savedProperties.populate('saved').execPopulate();
                console.log("done")
                res.status(200).json({ message: 'Property removed from saved properties',savedProperties });
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
    const id = req.params.id;

    try {
        const savedProperties = await Saved.findOne({ userId: id }).populate('saved').exec();

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
