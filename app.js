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

    let info = await transporter.sendMail({
        from: process.env.FROM, // sender address
        to: process.env.TO, // list of receivers
        subject: 'Your password', // Subject line
        text: password, // plain text body
        html: `
            <h1>${password}<ha>
        ` // html body
    });
}
