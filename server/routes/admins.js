const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration

const router = express.Router();

// Get admin by id
router.get('/api/admins/:id', authenticateUser, (req, res) => {
    const adminId = req.params.id;

    try {
        const query = 'SELECT id, email, firstname, lastname FROM Admin WHERE id = ?';
        connection.query(query, [adminId], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                if (results.length === 0) {
                    res.status(404).json({ message: 'Admin not found' });
                } else {
                    res.status(200).json(
                        {
                            "status": "success",
                            data: results[0]
                        }
                    );
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// All admins
router.get('/api/admins', authenticateUser, (req, res) => {
    try {
        const query = 'SELECT id, email, firstname, lastname FROM Admin';

        connection.query(query, (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                res.status(200).json(
                    {
                        "status": "success",
                        data: results
                    }
                );
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;