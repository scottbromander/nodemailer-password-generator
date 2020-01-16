
const nodemailer = require('nodemailer');

module.exports = async function(password) {

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