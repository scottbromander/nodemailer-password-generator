const express = require('express');
const app = express();
const generatePassword = require('password-generator');
const mail = require('./mailer');
const port = 5000;
require('dotenv').config()

app.listen(port, () => { console.log('LISTENING!')});

app.post('/api/password/new', (req, res) => {

    // create user object based on req.body
    // gen password
    const newPassword = generatePassword(8, false);
    // store user in DB
    // then email it! Tucked inside the success from DB entry
    mail(newPassword);

    // Whatever, just respond. Or move this into a function away from an endpoint and then no response needed.
    res.sendStatus(201);
});
