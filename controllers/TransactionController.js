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
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(Transaction);
    } catch (error) {
        res.status(500).json({ message: 'not fetch Transaction', error });
    }
});

//create a new Transaction
router.post('/', async (req, res) => {
    try {
        const { itemId, startDate, endDate, renterId } = req.body;
        
        // Fetch item details
        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // Calculate rental duration in days
        const rentalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
        const rentalCost = rentalDays * item.pricePerDay;

        // Calculate fees
        const serviceFee = rentalCost * 0.1; // Assuming service fee is 10%
        const insuranceFee = item.requiresInsurance ? rentalCost * 0.05 : 0.00; // Assuming insurance is 5% if required
        const totalAmount = rentalCost + serviceFee + insuranceFee;

        // Handle security deposit if required
        let depositAmount = 0.00;
        if (item.requiresDeposit) {
            depositAmount = item.depositAmount;
            await SecurityDeposit.create({
                userId: renterId,
                depositAmount,
                status: 'held'
            });
        }

        res.status(201).json({ rental: newRental, payment, message: "Rental created with fees, deposit, and payment tracking" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create rental with revenue model and payment tracking' });
    }
});

// delete Transaction
router.delete('/:id', async (req, res) => {
    try {
        const deleteTransaction = await TransactionModel.destroy({ where: { id: req.params.id } });
        if (deleteTransaction) {
            res.status(200).json({ message: 'Transaction Deleted' });
        } else {
            res.status(404).json({ message: 'Transaction Not Found' });
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
            res.status(404).json({ message: 'Transaction Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;