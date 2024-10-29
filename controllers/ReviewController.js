const express = require('express');
const router = express.Router();
const ReviewModel = require("../models/Review");

// get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await ReviewModel.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// get review by id
router.get('/:id', async (req, res) => {
    try {
        const review = await ReviewModel.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'not fetch user', error });
    }
});

//create a new review
router.post('/', async (req, res) => {
    try {
        const Newreview = await ReviewModel.create(req.body);
        res.status(201).json(Newreview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete review
router.delete('/:id', async (req, res) => {
    try {
        const deletereview = await ReviewModel.destroy({ where: { id: req.params.id } });
        if (deletereview) {
            res.status(200).json({ message: 'User Deleted' });
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//update review
router.put('/:id', async (req, res) => {
    try {
        const updatereview = await ReviewModel.update(req.body,
            { where: { id: req.params.id } }
        );
        if (updatereview) {
            res.status(200).json(updatereview);
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;