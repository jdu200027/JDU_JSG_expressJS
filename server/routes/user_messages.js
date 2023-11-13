const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration

const router = express.Router();

router.get('/api/user-messages', (req, res) => {
    const response = {
        "status": "success",
        "data": [
            {
                "id": 1,
                "sentmessage_id": 1,
                "user_id": 1,
                "group_id": 1,
                "is_read": 1,
                "is_saved": 0,
                "read_date": "2023-10-17 12:00:00"
            },
            {
                "id": 2,
                "sentmessage_id": 2,
                "user_id": 2,
                "group_id": 1,
                "is_read": 1,
                "is_saved": 1,
                "read_date": "2023-10-17 12:00:00"
            },
            {
                "id": 3,
                "sentmessage_id": 2,
                "user_id": 2,
                "group_id": 1,
                "is_read": 0,
                "is_saved": 1,
                "read_date": "2023-10-17 12:00:00"
            }
            // Additional user messages...
        ]
    }

    res.status(201).json({ data: response });
})

router.get('/api/user-messages/:id', (req, res) => {
    // Response Format (on Success):
    res.status(200).json(
        {
            "status": "success",
            "data": {
              "id": 1,
              "sentmessage_id": 1,
              "user_id": 1,
              "group_id": 1,
              "is_read": 1,
              "is_saved": 0,
              "read_date": "2023-10-17 12:00:00"
            }
          }
    )

})

router.post('/api/user-messages', (req, res) => {
    //Request Format:
    // {
    //     "sentmessage_id": 1,
    //     "user_id": 1,
    //     "group_id": 1,
    //     "is_read": 1,
    //     "is_saved": 0,
    //     "read_date": "2023-10-17 12:00:00"
    //   }

    //Response Format (on Success):
    res.status(200).json(
        {
            "status": "success",
            "message": "User message sent successfully"
          }
    )
})

router.get('/api/user-messages/:id', (req, res) => {
    // Response Format (on Success):
    res.status(200).json(
        
    {
        "status": "success",
        "data": {
          "id": 1,
          "sentmessage_id": 1,
          "user_id": 1,
          "group_id": 1,
          "is_read": 1,
          "is_saved": 0,
          "read_date": "2023-10-17 12:00:00"
        }
      }
    )
})

router.post('/api/user-messages', (req, res) => {
    // Request Format:

    // {
    //     "sentmessage_id": 1,
    //     "user_id": 1,
    //     "group_id": 1,
    //     "is_read": 1,
    //     "is_saved": 0,
    //     "read_date": "2023-10-17 12:00:00"
    //   }

    // response format
    res.status(200).json(
        {
            "status": "success",
            "message": "User message sent successfully"
          }
    )
})


router.put('/api/user-messages/:id', (req, res) => {
    // Request Format:

    // response format
    res.status(200).json(
        {
            "is_read": 1,
            "is_saved": 1,
            "read_date": "2023-10-17 12:00:00"
          }
    )
})

router.delete('/api/user-messages/:id', (req, res) => {
    // Response Format (on Success):
    res.status(200).json(
        {
            "status": "success",
            "message": "User message deleted successfully"
          }
    )
})

module.exports = router;