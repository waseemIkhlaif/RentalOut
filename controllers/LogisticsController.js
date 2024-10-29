const express = require('express');
const router = express.Router();
const LogisticModel = require("../models/Logistics");

// get all Logistic
router.get('/', async (req, res) => {
    try {
        const Logistics = await LogisticModel.findAll();
        res.status(200).json(Logistics);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// get Logistic by id
router.get('/:id', async (req, res) => {
    try {
        const Logistic = await LogisticModel.findByPk(req.params.id);
        if (!Logistic) {
            return res.status(404).json({ message: 'Logistic not found' });
        }
        res.status(200).json(Logistic);
    } catch (error) {
        res.status(500).json({ message: 'not fetch Logistic', error });
    }
});

//create a new Logistic
router.post('/', async (req, res) => {
    try {
        const NewLogistic = await LogisticModel.create(req.body);
        res.status(201).json(NewLogistic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete Logistic
router.delete('/:id', async (req, res) => {
    try {
        const deleteLogistic = await LogisticModel.destroy({ where: { id: req.params.id } });
        if (deleteLogistic) {
            res.status(200).json({ message: 'Logistic Deleted' });
        } else {
            res.status(404).json({ message: 'Logistic Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//update Logistic
router.put('/:id', async (req, res) => {
    try {
        const updateLogistic = await LogisticModel.update(req.body,
            { where: { id: req.params.id } }
        );
        if (updateLogistic) {
            res.status(200).json(updateLogistic);
        } else {
            res.status(404).json({ message: 'Logistic Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;