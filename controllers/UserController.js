const express = require('express');
const router = express.Router();
const userModel = require("../models/User");

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await userModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// get user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await userModel.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'not fetch user', error });
    }
});

//create a new user
router.post('/', async (req, res) => {
    try {
        const NewUser = await userModel.create(req.body);
        res.status(201).json(NewUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete user
router.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await userModel.destroy({ where: { id: req.params.id } });
        if (deleteUser) {
            res.status(200).json({ message: 'User Deleted' });
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//update user
router.put('/:id', async (req, res) => {
    try {
        const updateUser = await userModel.update(req.body,
            { where: { id: req.params.id } }
        );
        if (updateUser) {
            res.status(200).json(updateUser);
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;