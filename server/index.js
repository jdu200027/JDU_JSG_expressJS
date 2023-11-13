console.log("Hello JDU_APPLI!");

const express = require('express');
const bodyParser = require('body-parser');

const admin_auth = require('./routes/admin_auth');
const admins = require('./routes/admins');
const group_members = require('./routes/group_members')
const links = require('./routes/links');
const message_type = require('./routes/message_type')
const messages = require('./routes/messages')
const school_groups = require('./routes/school_groups')
const school_members = require('./routes/school_members')
const sent_messages = require('./routes/sent_messages')
const specififc_actions_on_messages = require('./routes/specififc_actions_on_messages')
const user_auth = require('./routes/user_auth')
const user_messages = require('./routes/user_messages')
const users = require('./routes/users')

const PORT = 3001;

const app = express();

app.get('/', (req, res)=>{
    res.status(200).json({message: 'Hello JDU_APPLI! in /'})
})

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());

app.use(admin_auth)
app.use(admins)
app.use(group_members)
app.use(links)
app.use(message_type)
app.use(messages)
app.use(school_groups)
app.use(school_members)
app.use(sent_messages)
app.use(specififc_actions_on_messages)
app.use(user_auth)
app.use(user_messages)
app.use(users)

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
