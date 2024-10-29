const express = require('express');
const router = express.Router();
const TransactionModel = require("../models/Transaction");

// get all Transactions
router.get('/', async (req, res) => {
    try {
        const Transactions = await TransactionModel.findAll();
        res.status(200).json(Transactions);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// get Transaction by id
router.get('/:id', async (req, res) => {
    try {
        const Transaction = await TransactionModel.findByPk(req.params.id);
        if (!Transaction) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(Transaction);
    } catch (error) {
        res.status(500).json({ message: 'not fetch user', error });
    }
});

//create a new Transaction
router.post('/', async (req, res) => {
    try {
        const NewTransaction = await TransactionModel.create(req.body);
        res.status(201).json(NewTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete Transaction
router.delete('/:id', async (req, res) => {
    try {
        const deleteTransaction = await TransactionModel.destroy({ where: { id: req.params.id } });
        if (deleteTransaction) {
            res.status(200).json({ message: 'User Deleted' });
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//update Transaction
router.put('/:id', async (req, res) => {
    try {
        const updateTransaction = await TransactionModel.update(req.body,
            { where: { id: req.params.id } }
        );
        if (updateTransaction) {
            res.status(200).json(updateTransaction);
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;