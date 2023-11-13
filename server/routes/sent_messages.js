const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const connection = require('../config/db'); // Make sure you have the appropriate DB configuration
const { json } = require('body-parser');

const router = express.Router();
// Post message
router.post('/api/sent-messages', authenticateUser, (req, res)=>{
  // request format 
  const {message_id, sent_at}  = req.body;
  const sent_messageQuery = "INSERT INTO sentmessage (message_id, sent_at) VALUES (?, ?)";
  try{
    connection.query(
      sent_messageQuery,  [message_id, sent_at], (err, result) =>{
        if(err) throw err;
        else{
          res.status(200).json({
            "status": "success",
            "message": "Message sent successfully"
          })
        }
      }
    )
  } catch{
    res.status(500).json({message: error});
  }
})

// Get all sent messages
router.get('/api/sent-messages', authenticateUser, (req, res) => {
  const selectSentMessagesQuery = "SELECT * FROM sentmessage";

  connection.query(selectSentMessagesQuery, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
      } else {
          const sentMessages = results.map(sentMessage => ({
              id: sentMessage.id,
              message_id: sentMessage.message_id,
              sent_at: sentMessage.sent_at
          }));

          res.status(200).json({
              status: 'success',
              data: sentMessages
          });
      }
  });
});

// Get message with ID
router.get('/api/sent-messages/:id', authenticateUser, (req, res) => {
  const sentMessageId = req.params.id;
  const selectSentMessageQuery = "SELECT * FROM sentmessage WHERE id = ?";

  connection.query(selectSentMessageQuery, [sentMessageId], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
      } else {
          if (results.length === 0) {
              res.status(404).json({ message: 'Sent message not found' });
          } else {
              const sentMessage = {
                  id: results[0].id,
                  message_id: results[0].message_id,
                  sent_at: results[0].sent_at
              };

              res.status(200).json({
                  status: 'success',
                  data: sentMessage
              });
          }
      }
  });
});

// Delete with ID
router.delete('/api/sent-messages/:id', authenticateUser, (req, res) => {
  const sentMessageId = req.params.id;
  const deleteSentMessageQuery = "DELETE FROM sentmessage WHERE id = ?";

  connection.query(deleteSentMessageQuery, [sentMessageId], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
      } else {
          if (result.affectedRows === 0) {
              res.status(404).json({ message: 'Sent message not found' });
          } else {
              res.status(200).json({
                  status: 'success',
                  message: 'Sent message deleted successfully'
              });
          }
      }
  });
});


module.exports = router;