const express = require('express');
const router = express.Router();
const RentalModel = require("../models/Rental");
const Item = require('../models/Item');

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
            return res.status(404).json({ message: 'Rental not found' });
        }
        res.status(200).json(Rental);
    } catch (error) {
        res.status(500).json({ message: 'not fetch Rental', error });
    }
});

// Create a new Rental
router.post('/', async (req, res) => {
    try {
        const { itemId, startDate, endDate } = req.body;
        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        const durationInDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
        const totalPrice = durationInDays * item.pricePerDay;
        const NewRental = await RentalModel.create({
            ...req.body,
            totalPrice,
        });
        res.status(201).json(NewRental);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//update rental status
router.put('/:id', async (req, res) => {
    try {
        const RentalStatus = RentalModel.findByPk(req.params.id);
        if (!RentalStatus) res.status(404).json({ message: "Rental not found" });

        RentalStatus.status = req.body;
        res.status(200).json(RentalStatus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete Rental
router.delete('/:id', async (req, res) => {
    try {
        const deleterental = await RentalModel.destroy({ where: { id: req.params.id } });
        if (deleterental) {
            res.status(200).json({ message: 'Rental Deleted' });
        } else {
            res.status(404).json({ message: 'Rental Not Found' });
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
            res.status(404).json({ message: 'Rental Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;