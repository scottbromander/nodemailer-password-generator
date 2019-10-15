const express = require('express');
const app = express();
const generatePassword = require('password-generator');
const nodemailer = require('nodemailer');
const port = 5000;
require('dotenv').config()

app.listen(port, () => { console.log('LISTENING!')});

app.get('/api/password/new', (req, res) => {
    const newPassword = generatePassword(8, false);

    // store password in database
    // then email it!
    mail(newPassword);

    // Whatever, just respond. Or move this into a function away from an endpoint and then no response needed.
    res.send(newPassword);
});

// async..await is not allowed in global scope, must use a wrapper
async function mail(password) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'scott@primeacademy.io', // sender address
        to: 'scottbromander@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: `<b>${password}</b>` // html body
    });
}
