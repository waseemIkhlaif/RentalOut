const express = require('express');
const router = express.Router();
const SecurityDepositModel = require("../models/SecurityDeposit");

// get all Deposits
router.get('/', async (req, res) => {
    try {
        const Deposits = await SecurityDepositModel.findAll();
        res.status(200).json(Deposits);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// get Deposit by id
router.get('/:id', async (req, res) => {
    try {
        const Deposit = await SecurityDepositModel.findByPk(req.params.id);
        if (!Deposit) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(Deposit);
    } catch (error) {
        res.status(500).json({ message: 'not fetch user', error });
    }
});

//create a new Deposit
router.post('/', async (req, res) => {
    try {
        const NewDeposit = await SecurityDepositModel.create(req.body);
        res.status(201).json(NewDeposit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete Deposit
router.delete('/:id', async (req, res) => {
    try {
        const deleteDeposit = await SecurityDepositModel.destroy({ where: { id: req.params.id } });
        if (deleteDeposit) {
            res.status(200).json({ message: 'User Deleted' });
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//update Deposit
router.put('/:id', async (req, res) => {
    try {
        const updateDeposit = await SecurityDepositModel.update(req.body,
            { where: { id: req.params.id } }
        );
        if (updateDeposit) {
            res.status(200).json(updateDeposit);
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;