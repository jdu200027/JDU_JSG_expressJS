const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration

const router = express.Router();

// Create message type
router.post('/api/message-types', authenticateUser, (req, res) => {
  // Request format
  const { title, icon } = req.body;
  console.log(title, icon);

  try {
      const insertMessageTypeQuery = "INSERT INTO messagetype (title, icon) VALUES (?, ?)";
      connection.query(insertMessageTypeQuery, [title, icon], (error, result) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal server error' });
          } else {
              res.status(200).json({
                  "status": "success",
                  "message": "Message type created successfully"
              });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all message types
router.get('/api/message-types', authenticateUser, (req, res) => {
  try {
      const query = 'SELECT id, title, icon FROM messagetype';
      connection.query(query, (error, results) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal server error' });
          } else {
              const messageTypes = results.map(type => ({
                  id: type.id,
                  title: type.title,
                  icon: type.icon
              }));

              res.status(200).json({
                  "status": "success",
                  "data": messageTypes
              });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Get message type by ID
router.get('/api/message-types/:id', authenticateUser, (req, res) => {
  const messageTypeId = req.params.id;

  try {
      const query = 'SELECT id, title, icon FROM messagetype WHERE id = ?';
      connection.query(query, [messageTypeId], (error, results) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal server error' });
          } else {
              if (results.length === 0) {
                  res.status(404).json({ message: 'Message type not found' });
              } else {
                  const messageType = results[0];
                  res.status(200).json({
                      "status": "success",
                      "data": {
                          id: messageType.id,
                          title: messageType.title,
                          icon: messageType.icon
                      }
                  });
              }
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Update message type by ID
router.put('/api/message-types/:id', authenticateUser, (req, res) => {
  const messageTypeId = req.params.id;
  const { title, icon } = req.body;

  try {
      const updateMessageTypeQuery = 'UPDATE messagetype SET title = ?, icon = ? WHERE id = ?';
      connection.query(updateMessageTypeQuery, [title, icon, messageTypeId], (error, result) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal server error' });
          } else {
              res.status(200).json({
                  "status": "success",
                  "message": "Message type updated successfully"
              });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete message type by ID
router.delete('/api/message-types/:id', authenticateUser, (req, res) => {
  const messageTypeId = req.params.id;

  try {
      const deleteMessageTypeQuery = 'DELETE FROM messagetype WHERE id = ?';
      connection.query(deleteMessageTypeQuery, [messageTypeId], (error, result) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal server error' });
          } else {
              res.status(200).json({
                  "status": "success",
                  "message": "Message type deleted successfully"
              });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
