const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); 

const router = express.Router();

// Create a new message complete
router.post('/api/messages', authenticateUser, (req, res) => {
    const {
        title,
        description,
        priority,
        created_date,
        admin_id,
        updated_date,
        messagetype_id,
        deviceEndpoint,
        deviceToken,   
    } = req.body;

    const insertMessageQuery = "INSERT INTO message (title, description, priority, created_date, admin_id, updated_date, messagetype_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(
        insertMessageQuery,
        [title, description, priority, created_date, admin_id, updated_date, messagetype_id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                res.status(200).json({
                    "status": "success",
                    "message": "Message created successfully"
                });
            }
        }
    );
});
// Get messages complete
router.get('/api/messages', authenticateUser, (req, res) => {
    const selectMessagesQuery = "SELECT * FROM message ORDER BY id DESC";

    connection.query(selectMessagesQuery, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            const messages = results.map(message => ({
                id: message.id,
                title: message.title,
                description: message.description,
                priority: message.priority,
                created_date: message.created_date,
                admin_id: message.admin_id,
                updated_date: message.updated_date,
                messagetype_id: message.messagetype_id
            }));

            res.status(200).json({
                status: 'success',
                data: messages
            });
        }
    });
});

// get mesaage from id
router.get('/api/messages/:id', authenticateUser, (req, res) => {
    const messageId = req.params.id;
    const selectMessageQuery = "SELECT * FROM message WHERE id = ?";

    connection.query(selectMessageQuery, [messageId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Message not found' });
            } else {
                const message = {
                    id: results[0].id,
                    title: results[0].title,
                    description: results[0].description,
                    priority: results[0].priority,
                    created_date: results[0].created_date,
                    admin_id: results[0].admin_id,
                    updated_date: results[0].updated_date,
                    messagetype_id: results[0].messagetype_id
                };

                res.status(200).json({
                    status: 'success',
                    data: message
                });
            }
        }
    });
});

// put messages with id
router.put('/api/messages/:id', authenticateUser, (req, res) => {
    const messageId = req.params.id;
    const {
        title,
        description,
        priority,
        created_date,
        admin_id,
        updated_date,
        messagetype_id
    } = req.body;

    const updateMessageQuery = `
      UPDATE message
      SET title=?, description=?, priority=?, created_date=?, admin_id=?, updated_date=?, messagetype_id=?
      WHERE id=?
  `;

    connection.query(
        updateMessageQuery,
        [title, description, priority, created_date, admin_id, updated_date, messagetype_id, messageId],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'Message updated successfully'
                });
            }
        }
    );
});

// delete message from id
router.delete('/api/messages/:id', authenticateUser, (req, res) => {
    const messageId = req.params.id;
    const deleteMessageQuery = "DELETE FROM message WHERE id = ?";

    connection.query(deleteMessageQuery, [messageId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Message not found' });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'Message deleted successfully'
                });
            }
        }
    });
});

module.exports = router;