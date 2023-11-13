const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration

const router = express.Router();

router.get('/api/group-members', (req, res) => {
    res.status(200).json(
        res.status(200).json(
            {
                "status": "success",
                "data": [
                    {
                        "id": 1,
                        "firstname": "John",
                        "lastname": "Doe",
                        "middlename": "Middle",
                        "student_id": "123456789",
                        "email": "user1@example.com",
                        "phone_number": "1234567890",
                        "father_name": "Father",
                        "mother_name": "Mother",
                        "father_phone_number": "1234567890",
                        "mother_phone_number": "1234567890",
                        "last_login_date": "2023-10-17 12:00:00"
                    },
                    {
                        "id": 2,
                        "firstname": "Jane",
                        "lastname": "Doe",
                        "middlename": "Middle",
                        "student_id": "987654321",
                        "email": "user2@example.com",
                        "phone_number": "1234567890",
                        "father_name": "Father",
                        "mother_name": "Mother",
                        "father_phone_number": "1234567890",
                        "mother_phone_number": "1234567890",
                        "last_login_date": "2023-10-17 12:00:00"
                    }
                    // Additional users...
                ]
            }
        )
    )
})

router.get('/api/group-members/:id', (req, res) => {
    res.status(200).json(
        {
            "id": 1,
            "firstname": "John",
            "lastname": "Doe",
            "middlename": "Middle",
            "student_id": "123456789",
            "email": "user1@example.com",
            "phone_number": "1234567890",
            "father_name": "Father",
            "mother_name": "Mother",
            "father_phone_number": "1234567890",
            "mother_phone_number": "1234567890",
            "last_login_date": "2023-10-17 12:00:00"
        }
    )
})

router.post('/api/group-members', (req, res) => {
    res.status(200).json(
        {
            "data": "success",
            "message": '/api/group-members is success'
        }
    )
})

router.put('/api/group-members/:id', (req, res) => {
    res.status(200).json({
        "data": "put is success"
    })
})

router.delete('/api/group-members/:id', (req, res) => {
    res.status(200).json(
        {
            "data": "delete success"
        }
    )
})


module.exports = router;
