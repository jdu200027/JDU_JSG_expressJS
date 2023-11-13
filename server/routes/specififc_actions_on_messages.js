const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration

const router = express.Router();

router.post('/api/user-messages/mark-as-read/:id', (req, res)=>{
    res.status(200).json({
        "status": "success",
        "message": "Message marked as read successfully"
      })
})

router.post('/api/user-messages/mark-as-saved/:id', (req, res)=>{
    res.status(200).json(
        {
            "status": "success",
            "message": "Message marked as saved successfully"
          }
    )
})


module.exports = router;