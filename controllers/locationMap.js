const express = require('express');
const router = express.Router();
const LocationModel = require("../models/Location"); 

router.get('/locations', async (req, res) => {
    try {
        const locations = await LocationModel.findAll();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get location by ID
router.get('/locations/:id', async (req, res) => {
    try {
        const location = await LocationModel.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new location
router.post('/locations', async (req, res) => {
    try {
        const newLocation = await LocationModel.create({
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete location
router.delete('/locations/:id', async (req, res) => {
    try {
        const deleteLocation = await LocationModel.destroy({ where: { id: req.params.id } });
        if (deleteLocation) {
            res.status(200).json({ message: 'Location deleted' });
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update location
router.put('/locations/:id', async (req, res) => {
    try {
        const [updated] = await LocationModel.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedLocation = await LocationModel.findByPk(req.params.id);
            res.status(200).json(updatedLocation);
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;