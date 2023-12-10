console.log("Hello JDU_APPLI!");

const express = require('express');
const bodyParser = require('body-parser');

const role = require('./routes/role');
const admin_auth = require('./routes/admin_auth');
const admins = require('./routes/admins');
const school = require('./routes/school');
const links = require('./routes/links');
const message_type = require('./routes/message_type');
const messages = require('./routes/messages');
const school_groups = require('./routes/school_groups');
const sent_messages = require('./routes/sent_messages');
const users = require('./routes/users');

const app = express();

app.get('/', (req, res)=>{
    res.status(200).json({message: 'Hello JDU_APPLI! in /'});
});

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());

app.use(role);
app.use(school);
app.use(admin_auth);
app.use(admins);
app.use(links);
app.use(message_type);
app.use(messages);
app.use(school_groups);
app.use(sent_messages);
app.use(users);

module.exports = app;