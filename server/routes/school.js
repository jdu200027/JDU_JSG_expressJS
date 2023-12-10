const connection = require('../config/db');
const auth = require('../middleware/authenticateUser');
const express = require('express');

const router = express();

router.post("/create-school", auth, (req, res) => {
    const { name, address, contact_email } = req.body;
    
    const insertSchoolSQL = "INSERT INTO School (name, address, contact_email) VALUES (?, ?, ?)";
    
    try {
        connection.query(insertSchoolSQL, [name, address, contact_email], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Internal server error" });
            } else {
                res.status(200).json({ message: "School created successfully" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/get-schools", auth, (req, res) => {
    const getSchools = "SELECT * FROM School";
    try {
        connection.query(getSchools, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "Internal server errror" });
            } else {
                res.status(200).json({ message: result });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server errror" })
    }
});

router.get("/get-school/:id", auth, (req, res) => {
    const { id } = req.body;

    const getSchoolIDSQL = "SELECT * from School WHERE id = ?";

    try {
        connection.connect(getSchoolIDSQL, [id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: "internal server error" });
            } else {
                res.status(200).json({ message: result });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.put("/put-school/:id", auth, (req, res) => {
    const { name, address, contact_email } = req.body;
    const put_id = req.params.id;
    const putSchoolSQL = "UPDATE School SET name = ? , address = ?, contact_email = ? WHERE id = ?";

    try {
        connection.query(putSchoolSQL, [name, address, contact_email, put_id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                // Check if any rows were affected
                if (result.affectedRows > 0) {
                    res.status(200).json({ message: "School updated successfully" });
                } else {
                    // No rows were updated (school ID not found)
                    res.status(404).json({ message: "School not found" });
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.delete("/delete-school/:id", auth, (req, res) => {
    const deleteSchoolSQLID = req.params.id;
    const deleteSchoolSQL = "DELETE FROM School WHERE id = ?";

    try {
        connection.query(deleteSchoolSQL, [deleteSchoolSQLID], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                // Check if any rows were affected
                if (result.affectedRows > 0) {
                    res.status(200).json({ message: "School deleted successfully" });
                } else {
                    // No rows were deleted (school ID not found)
                    res.status(404).json({ message: "School not found" });
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;