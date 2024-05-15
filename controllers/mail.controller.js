const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
require('dotenv').config();
const User = require('../models/userModel');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
    tls: true,
    logger: true,  // Add this line for logging
    debug: true
});

// Configure Handlebars as the template engine
const handlebarOptions = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.resolve('../Twitter_APIs/emailTemplates'),
      defaultLayout: false,
    },
    viewPath: path.resolve('../Twitter_APIs/emailTemplates'),
    extName: '.hbs',
};
  
transporter.use('compile', hbs(handlebarOptions));

const sendTemplateMail = (req, res) => {
    console.log("Sending text mail...")
    // const { to, token } = req.body;
    const token = req.verificationToken;
    console.log('token from mailC: ', token);
    
    // Define email options
    const mailData = {
        from: process.env.EMAIL_USER,
        to: 'sankavi.djms@gmail.com',
        subject: 'Account Activation',
        template: 'index',
        context: {
            activationLink: `http://localhost:3000/api/auth/activate-account?token=${token}`
        }
    };
    console.log(mailData);

    transporter.sendMail(mailData, (error, info) => {
        console.log('transporter started...');
        if (error) {
            return console.log('Error Occured: ', error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
};



module.exports = sendTemplateMail;
