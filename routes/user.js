const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/users', async (req, res) => {
    try {
        let users = await userController.getAllUsers();
        res.json(users);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        let user = await userController.getUserById(req.params.id);
        res.json(user);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.post('/user', async (req, res) => {
    try {
        let user = await userController.addUser(req.body.name, req.body.email, req.body.password);
        res.json(user);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

module.exports = router;
