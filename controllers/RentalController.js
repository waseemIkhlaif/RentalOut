const express = require('express');
const router = express.Router();
const RentalModel = require("../models/Rental");

// get all Rentals
router.get('/', async (req, res) => {
    try {
        const Rentals = await RentalModel.findAll();
        res.status(200).json(Rentals);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// get Rental by id
router.get('/:id', async (req, res) => {
    try {
        const Rental = await RentalModel.findByPk(req.params.id);
        if (!Rental) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(Rental);
    } catch (error) {
        res.status(500).json({ message: 'not fetch user', error });
    }
});

//create a new Rental
router.post('/', async (req, res) => {
    try {
        const NewRental = await RentalModel.create(req.body);
        res.status(201).json(NewRental);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete Rental
router.delete('/:id', async (req, res) => {
    try {
        const deleterental = await RentalModel.destroy({ where: { id: req.params.id } });
        if (deleterental) {
            res.status(200).json({ message: 'User Deleted' });
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//update rental
router.put('/:id', async (req, res) => {
    try {
        const updateRental = await RentalModel.update(req.body,
            { where: { id: req.params.id } }
        );
        if (updateRental) {
            res.status(200).json(updateRental);
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;