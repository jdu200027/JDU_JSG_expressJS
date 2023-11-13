const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration

const router = express.Router();

router.get('/api/group-members', (req, res) => {
    res.status(200).json({
        "data": {
            "id": 1,
            "name": "Rasul"
        }
    })
})

router.get('/api/group-members/:id', (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "data": {
                
                "id": 1,
                "name": "Rasul",
            }
        }
    )
})

router.post('/api/group-members', (req, res) => {
    const { email, firstname, lastname } = req.body;

    res.status(200).json({
        "status": "success",
        "data": {
            "id": 1,
            "name": "Rasul"
        }
    })
})

router.put('/api/group-members/:id', (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "data": {
                "id": 1,
                "update": "success"
            }
        }
    )
})

router.delete('/api/group-members/:id', (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "data": {
                "id": 1,
                "delete": "success"
            }
        }
    )
})

module.exports = router;

