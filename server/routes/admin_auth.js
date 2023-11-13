const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration

const SECRET_KEY = 'your_secret_key';

const router = express.Router();

// Create admin
router.post('/admin/register', async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = "INSERT INTO admin (email, password, firstname, lastname) VALUES (?, ?, ?, ?)";

        connection.query(
            insertUserQuery, [email, hashedPassword, firstname, lastname], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Failed to register user' });
                } else {
                    res.status(201).json({ message: 'User registered successfully' });
                }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login admin
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user in the database
        connection.query('SELECT * FROM Admin WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
                expiresIn: '72h'
            });

            // Send the token in the response
            res.status(200).json(
                {
                    "status": "success",
                    "message": "Login successful",
                    token
                }
            );
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Logout admin
router.post('/admin/logout', authenticateUser, (req, res) => {
    res.status(200).json({
        message: {
            "status": "success",
            "message": "Logout successfully"
        }
    });
});

// AccessResoure Token
router.get('/accessResoure', authenticateUser, (req, res) => {
    try {
        // const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], SECRET_KEY);
        res.status(200).json({ success: true, data: { userId: req.userId } });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;