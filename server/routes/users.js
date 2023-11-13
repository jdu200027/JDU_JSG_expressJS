const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration

const SECRET_KEY = 'your_secret_key';

const router = express.Router();

router.get('/api/users', (req, res) =>{
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
});

router.get('/api/users/:id', (req, res)=>{
    res.status(200).json(
        {
            "status": "success",
            "data": {
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
          }
    )
});

router.post('/api/users', (req, res)=>{
    const userId = req.params.id;
    try{
        const {fistname, lastname, middlename, student_id, email, phone_number, father_name, mother_name, father_phone_number, mother_phone_number, password} = req.body;

        res.status(200).json(
            {
                "status": "success",
                "message": "User created successfully"
              }
        )
    } catch{
        res.status(500).json({message: 'Interval error'});
    };
});

router.put('/api/users/:id', (req,  res)=>{
    const userId = req.params.id;
    try{
        const {fistname, lastname, middlename, student_id, email, phone_number, father_name, mother_name, father_phone_number, mother_phone_number, password} = req.body;

        res.status(200).json(
            {
                "status": "success",
                "message": "User updated successfully"
              }
        )
    } catch{
        res.status(500).json(
            {
                "status": "success",
                "message": "User updated successfully"
              }
        )
    }
});

router.delete('/api/users/:id', (req, res)=>{
    res.status(200).json(
        {
            "status": "success",
            "message": "User deleted successfully"
          }
    )
});

module.exports = router;


