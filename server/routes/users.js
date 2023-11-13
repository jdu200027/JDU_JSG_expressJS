const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration
const SECRET_KEY = 'your_secret_key';

const router = express.Router();

router.get('/api/users', authenticateUser, (req, res) =>{
    const selectAllUser = "SELECT * FROM user";

    try{
        connection.connect(selectAllUser, (err, result)=>{
            if(err){
                console.log(err);
                res.status(500).json({message: "Internal server error"});
            } else{
                res.status(200).json({
                    "status": "success",
                    "data": {result}
                });
            };
        });
    }catch (error){
        console.log(error);
        res.status(500).json({message: "Interval server error"});
    };
});

router.get('/api/users/:id', authenticateUser, (req, res)=>{
    const userId = req.params.id;
    res.status(200).json({message: userId});
    const userIdSql = "SELECT * FROM user WHERE id = ?";
    try{
        connection.connect(userIdSql, [userId], (err, result)=>{
            if(err){
                console.log(err);
                res.status(500).json({error: "Internal server error"});
            }else{
                res.status(200).json({result});
            }
            if(userIdSql.length >= 0){
                res.status(404).json({message: "User is not found"})
            }
        })
    }catch(error){
        res.status(500).json({error: "Internal server error"});
    }
});

router.post('/api/users', authenticateUser, (req, res)=>{
    const {fistname, lastname, middlename, student_id, email, phone_number, father_name, mother_name, father_phone_number, mother_phone_number, password} = req.body;

    const insertUserToSQL = "INSERT INTO user (firstname, lastname, middlename, student_id, email, phone_number, father_name, mother_name, father_phone_number, mother_phone_number, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    try{
        connection.connect(insertUserToSQL, [fistname, lastname, middlename, student_id, email, phone_number, father_name, mother_name, father_name, father_phone_number, mother_phone_number, password], (err, result)=>{
            if(err){
                res.status(500).json({error: "Internal server error"})
                console.log("Internal server error");
            }else{
                res.status(200).json({
                    "status": "success",
                    "message": "User created successfully"
                });
            };
        });
    } catch{
        console.log("Internal server error");
        res.status(500).json({message: 'Interval error'});
    };
});

router.put('/api/users/:id', authenticateUser, (req, res) => {
    const userId = req.params.id;
    const { firstname, lastname, middlename, student_id, email, phone_number, father_name, mother_name, father_phone_number, mother_phone_number, password } = req.body;

    const updateUserToSQL = `
        UPDATE users
        SET firstname = ?, lastname = ?, middlename = ?, student_id = ?, email = ?,
        phone_number = ?, father_name = ?, mother_name = ?, father_phone_number = ?,
        mother_phone_number = ?, password = ?
        WHERE id = ?
    `;

    try {
        connection.query(
            updateUserToSQL,
            [firstname, lastname, middlename, student_id, email, phone_number, father_name, mother_name, father_phone_number, mother_phone_number, password, userId],
            (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ status: "error", message: "Internal Server Error" });
                } else {
                    res.status(200).json({
                        status: "success",
                        message: "User updated successfully"
                    });
                }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/api/users/:id', authenticateUser, (req, res) => {
    const userId = req.params.id;

    const deleteUserFromSQL = "DELETE FROM users WHERE id = ?";

    try {
        connection.query(deleteUserFromSQL, [userId], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ status: "error", message: "Internal Server Error" });
            } else {
                if (result.affectedRows > 0) {
                    res.status(200).json({
                        status: "success",
                        message: "User deleted successfully"
                    });
                } else {
                    res.status(404).json({ status: "error", message: "User not found" });
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

module.exports = router;


