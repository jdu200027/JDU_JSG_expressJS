const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration

const router = express.Router();

// Create new group
router.post('/api/school-group', (req, res) => {
  // Request format
  const { name, created_date } = req.body;

  try {
      const insertGroupQuery = "INSERT INTO schoolgroup (name, created_date) VALUES (?, ?)";
      connection.query(insertGroupQuery, [name, created_date], (error, result) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal server error' });
          } else {
              res.status(200).json({
                  "status": "success",
                  "message": "School group created successfully"
              });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// All groups
router.get('/api/school-groups', (req, res) => {
  try {
      const query = 'SELECT id, name, created_date FROM schoolgroup';
      connection.query(query, (error, results) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal server error' });
          } else {
              const groups = results.map(group => ({
                  id: group.id,
                  name: group.name,
                  created_date: group.created_date
              }));

              res.status(200).json({
                  "status": "success",
                  "data": groups
              });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Get group by id
router.get('/api/school-groups/:id', (req, res) => {
  const groupId = req.params.id;

  try {
      const query = 'SELECT id, name, created_date FROM schoolgroup WHERE id = ?';
      connection.query(query, [groupId], (error, results) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal server error' });
          } else {
              if (results.length === 0) {
                  res.status(404).json({ message: 'School group not found' });
              } else {
                  const group = results[0];
                  res.status(200).json({
                      "status": "success",
                      "data": {
                          id: group.id,
                          name: group.name,
                          created_date: group.created_date
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

// Update group by id
router.put('/api/school-groups/:id', (req, res) => {
  const groupId = req.params.id;
  const { name, created_date } = req.body;

  try {
      const updateGroupQuery = 'UPDATE schoolgroup SET name = ?, created_date = ? WHERE id = ?';
      connection.query(updateGroupQuery, [name, created_date, groupId], (error, result) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal server error' });
          } else {
              res.status(200).json({
                  "status": "success",
                  "message": "School group updated successfully"
              });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete group by id
router.delete('/api/school-groups/:id', (req, res) => {
  const groupId = req.params.id;

  try {
      const deleteGroupQuery = 'DELETE FROM schoolgroup WHERE id = ?';
      connection.query(deleteGroupQuery, [groupId], (error, result) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal server error' });
          } else {
              res.status(200).json({
                  "status": "success",
                  "message": "School group deleted successfully"
              });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
