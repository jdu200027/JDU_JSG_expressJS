const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration

const SECRET_KEY = 'your_secret_key';

const router = express.Router();

router.post('/api/login', (req, res)=>{
    try {
        const { email, password } = req.body;

        const json = {
            "status": "success",
            "message": "Login successful",
            "token": "<JWT_TOKEN>"
          }
          res.status(200).json(json)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


// Logout 
router.post('/api/logout',  (req, res) => {
    res.status(200).json({
        "status": "success",
        "message": "Logout successful"
      })
})


module.exports = router;