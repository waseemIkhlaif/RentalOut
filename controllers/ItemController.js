const express = require('express');
const router = express.Router();
const ItemModel = require("../models/Item");

// get all items
router.get('/', async (req, res) => {
    try {
        const Items = await ItemModel.findAll();
        res.status(200).json(Items);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// get item by id
router.get('/:id', async (req, res) => {
    try {
        const item = await ItemModel.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'not fetch user', error });
    }
});

//create a new item
router.post('/', async (req, res) => {
    try {
        const NewItem = await ItemModel.create(req.body);
        res.status(201).json(NewItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete item
router.delete('/:id', async (req, res) => {
    try {
        const deleteitem = await ItemModel.destroy({ where: { id: req.params.id } });
        if (deleteitem) {
            res.status(200).json({ message: 'User Deleted' });
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//update item
router.put('/:id', async (req, res) => {
    try {
        const updateitem = await ItemModel.update(req.body,
            { where: { id: req.params.id } }
        );
        if (updateitem) {
            res.status(200).json(updateitem);
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;