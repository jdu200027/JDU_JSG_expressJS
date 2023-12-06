const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';

const router = express();

// Create Role 
router.post('/register-role', async (req, res) => {
    const { name, password, description } = req.body;
    const insertRoleQuery = "INSERT INTO role (name, password, description, permissions) VALUES (?, ?, ?, ?)";
    const hashedPassword = await argon2.hash(password);
    const permissions = {
        "Role": {
            "create": true,
            "read": true,
            "update": true,
            "delete": true
        },
        "School": {
            "create": true,
            "read": true,
            "update": true,
            "delete": true
        },
        "Admin": {
            "create": true,
            "read": true,
            "update": true,
            "delete": true
        },
        "User": {
            "create": true,
            "read": true,
            "update": true,
            "delete": true
        },
        "SchoolGroup": {
            "create": true,
            "read": true,
            "update": true,
            "delete": true
        },
        "MessageType": {
            "create": true,
            "read": true,
            "update": true,
            "delete": true
        },
        "Link": {
            "create": true,
            "read": true,
            "update": true,
            "delete": true
        },
        "Message": {
            "create": true,
            "read": true,
            "update": true
        }
    }

    try {
        connection.query(insertRoleQuery, [name, hashedPassword, description, JSON.stringify(permissions)], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.status(200).json({
                    message: {
                        "data": "Role is success"
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/login-role", async (req, res) => {
    try {
        const { name, password } = req.body;

        // Find the user in the database
        connection.query('SELECT * FROM Role WHERE name = ?', [name], async (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const user = results[0];
            const hashedPassword = user.password;

            // Compare the hashed password with the provided password
            const passwordMatch = await argon2.verify(hashedPassword, password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
                expiresIn: '72h'
            });

            // Send the token in the response
            res.status(200).json({
                status: 'success',
                message: 'Login successful',
                token,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// AccessResoure Token
router.get('/accessResoure', authenticateUser, (req, res) => {
    try {
        // const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], SECRET_KEY);
        res.status(200).json({ success: true, data: { userId: req.userId } });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

router.get("/get-roles", authenticateUser, (req, res) => {
    const selectRolesQuery = "SELECT * FROM Role";

    try {
        connection.query(selectRolesQuery, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: 'Internal server error' });
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/get-role/:id', authenticateUser, (req, res) => {
    const roleId = req.params.id;

    const selectRoleQuery = 'SELECT * FROM Role WHERE id = ?';

    try {
        connection.query(selectRoleQuery, [roleId], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                if (result.length === 0) {
                    res.status(404).json({ message: 'Role not found' });
                } else {
                    res.status(200).json(result[0]);
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/put-role', authenticateUser, (req, res) => {
    const { id, name, password, description, permissions } = req.body;

    const updateRoleQuery = 'UPDATE Role SET name = ?, password = ?, description = ?, permissions = ? WHERE id = ?';

    try {
        connection.query(updateRoleQuery, [name, password, description, permissions, id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(200).json({ message: 'Role updated successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete-role', authenticateUser, (req, res) => {
    const roleId = req.body.id;

    const deleteRoleQuery = 'DELETE FROM Role WHERE id = ?';

    try {
        connection.query(deleteRoleQuery, [roleId], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(200).json({ message: 'Role deleted successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router
