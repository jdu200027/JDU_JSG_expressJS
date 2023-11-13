const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'jdumsg',
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

// // Close the connection
// connection.end((err) => {
//   if (err) {
//     console.error('Error closing the database connection: ' + err.stack);
//     return;
//   }
//   console.log('Database connection closed.');
// });

module.exports = connection;
