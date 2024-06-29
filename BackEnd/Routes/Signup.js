const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { userModule } = require('../connection/connection');
// const { transporter } = require('../mailer');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required' });
    }

    try {
        const existingUser = await userModule.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = crypto.randomBytes(3).toString('hex');

        const newUser = await userModule.create({
            username : username,
            password: hashedPassword,
            email,
            verificationCode,
            isVerified: false
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD 
            }
        });
        
// console.log('password:'+process.env.EMAIL_PASSWORD);
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Email Verification',
            text: `Your verification code is ${verificationCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending verification email:', error);
                return res.status(500).send({ message: 'Error sending verification email', error });
            } else {
                console.log('Verification email sent:', info.response);
                res.status(201).send({ message: 'User created successfully, verification email sent', user: newUser });
            }
        });
    } catch (error) {
        console.error('Error Creating User:', error);
        res.status(500).json({ error: 'Username alredy Exists', details: error.message });
    }
});

module.exports = router;
