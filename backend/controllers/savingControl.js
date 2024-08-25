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
        let savedProperties = await Saved.findOne({ userId });

        if (savedProperties) {
            if (!savedProperties.saved.includes(propId)) {
                savedProperties.saved.push(propId);
                await savedProperties.save();
                res.status(200).json({ propId, message: 'Property added to saved properties' });
            } else {
                res.status(400).json({ message: 'Property already saved' });
            }
        } else {
            const newSavedProperties = new Saved({
                userId,
                saved: [propId]
            });
            await newSavedProperties.save();
            res.status(200).json({ propId, message: 'Property added to saved properties' });
        }
    } catch (error) {
        console.log("Error occurred:", error);
        res.status(400).json({ message: error.message });
    }
});

// Remove a property
router.put('/remove/:id', async (req, res) => {
    const userId = req.params.id;
    const { propId } = req.body;

    try {
        const savedProperties = await Saved.findOne({ userId });

        if (savedProperties) {
            const index = savedProperties.saved.indexOf(propId);
            if (index > -1) {
                savedProperties.saved.splice(index, 1);
                await savedProperties.save();
                res.status(200).json({ propId, message: 'Property removed from saved properties' });
            } else {
                res.status(400).json({ message: 'Property not found in saved properties' });
            }
        } else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        console.log("Error occurred:", error);
        res.status(400).json({ message: error.message });
    }
});

// Get saved properties
router.get('/getSaved/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const savedProperties = await Saved.findOne({ userId })
            .populate({
                path: 'saved',
                populate: { path: 'sellerId' } 
            })
            .exec();
        
        if (savedProperties) {
            res.status(200).json(savedProperties.saved);
        } else {
            res.status(400).json({ message: "Not Found" });
        }
    } catch (error) {
        console.log("Error occurred:", error);
        res.status(400).json({ message: error.message });
    }
});


router.get('/getSavedIds/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const savedProperties = await Saved.findOne({ userId });
        if (savedProperties) {
            const propIds = savedProperties.saved.map((prop) => prop.toString());
            res.status(200).json(propIds);
        } else {
            res.status(400).json({ message: "Not Found" });
        }
    } catch (error) {
        console.log("Error occurred:", error);
        res.status(400).json({ message: error.message });
    }
});



module.exports = router;
