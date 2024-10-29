const express = require('express');
const router = express.Router();
const CategoryModel = require("../models/Category");

// get all Categories
router.get('/', async (req, res) => {
    try {
        const Categories = await CategoryModel.findAll();
        res.status(200).json(Categories);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// get category by id
router.get('/:id', async (req, res) => {
    try {
        const Category = await CategoryModel.findByPk(req.params.id);
        if (!Category) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(Category);
    } catch (error) {
        res.status(500).json({ message: 'not fetch user', error });
    }
});

//create a new category
router.post('/', async (req, res) => {
    try {
        const NewCategory = await CategoryModel.create(req.body);
        res.status(201).json(NewCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete category
router.delete('/:id', async (req, res) => {
    try {
        const deleteCategory = await CategoryModel.destroy({ where: { id: req.params.id } });
        if (deleteCategory) {
            res.status(200).json({ message: 'User Deleted' });
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//update category
router.put('/:id', async (req, res) => {
    try {
        const updateCategory = await CategoryModel.update(req.body,
            { where: { id: req.params.id } }
        );
        if (updateCategory) {
            res.status(200).json(updateCategory);
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;