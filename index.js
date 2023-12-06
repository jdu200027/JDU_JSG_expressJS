const app = require('./server/index');
const serverless = require('serverless-http');

const PORT = 3001;


// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
//   });

module.exports.handler = serverless(app);