const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration

const router = express.Router();

router.post('/api/links', authenticateUser, (req, res)=>{
  const {title, url} = req.body;
  const insertURLToSQL = "INSERT INTO link (title, url) VALUES (?, ?)";
  try{
    connection.query(insertURLToSQL, [title, url], (err, result)=>{
      if(err) throw err;
      else{
        res.status(200).json(
          {
              "status": "success",
              "message": "Link created successfully"
            }
      )
      }
    })
  }catch{
    res.status(500).json({message: error})
  };
})

router.get('/api/links', authenticateUser, (req, res) => {
  const selectURLfromSQL = "SELECT * FROM link";

  try {
    connection.query(selectURLfromSQL, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
      } else {
        res.status(200).json({
          status: "success",
          data: result
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.get('/api/links/:id', authenticateUser, (req, res) => {
  const linkId = req.params.id;
  const selectURLFromSQL = "SELECT * FROM link WHERE id = ?";
  try {
    connection.query(selectURLFromSQL, [linkId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
      } else {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result[0] // Assuming there is only one link with a given ID
          });
        } else {
          res.status(404).json({ status: "error", message: "Link not found" });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.put('/api/links/:id', authenticateUser, (req, res) => {
  const linkId = req.params.id;
  const { title, url } = req.body;

  const updateURLToSQL = "UPDATE link SET title = ?, url = ? WHERE id = ?";

  try {
    connection.query(updateURLToSQL, [title, url, linkId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
      } else {
        res.status(200).json({
          status: "success",
          message: "Link updated successfully"
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.delete('/api/links/:id', authenticateUser, (req, res) => {
  const linkId = req.params.id;
  const deleteURLFromSQL = "DELETE FROM link WHERE id = ?";

  try {
    connection.query(deleteURLFromSQL, [linkId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
      } else {
        res.status(200).json({
          status: "success",
          message: "Link deleted successfully"
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
