require('dotenv').config();
const sendMessage = require("../model/sendMessage");
const User = require("../model/User");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const validate = require('validator');
const nodemailer = require('nodemailer');


module.exports.home = async (req, res) => {
    res.status(200).json('Welcome to home page')
}
module.exports.register = async (req, res) => {
    try {
        const { username, email, password, password2, yourGender, address } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json('User exists in the database!')
        }
        else {
            if (validate.isEmpty(username) || username.length < 3) {
                res.status(400).json('Username cannot be empty Or less than 3 characters!')
            }
            else if (!validate.isEmail(email)) {
                res.status(400).json('please enter a valid email!')
            }
            else if (!validate.isStrongPassword(password) || !validate.isStrongPassword(password2)) {
                res.status(401).json('Please choose stronger password!')
            }
            else if (password !== password2) {
                res.status(401).json('password  and confirmPassword mismatched!')
            }
            else if (password.length < 13 || password2.length < 13) {
                res.status(401).json('Passwords should be of length 13 or more characters long!')
            }
            else if (validate.isEmpty(yourGender) || validate.isEmpty(address)) {
                res.status(400).json('Gender or address field needed!')
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await User.create({
                    username: req.body.username,
                    email: req.body.email,
                    yourGender: req.body.yourGender,
                    address: req.body.address,
                    password: hashedPassword,
                    password2: hashedPassword

                });
                await newUser.save();
                res.status(201).json('User created successfully!')
            }

        }

    } catch (error) {
        res.status(500).json(error.message)
    }
}


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || validate.isEmpty(email)) {
            res.status(400).json('User does not exist!')
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json('Incorrect password!');
        }
        else {
            // const payload = ;            
            req.session.id = true;
            req.session.username = user.username;
            const token = await JWT.sign({ id: user._id, email: user.email }, process.env.SECRET_JWT, { expiresIn: '60m' });
            res.header('Authorization', token);
            res.status(200).json({ username: req.session.username, id: req.session.id, token: token, _id: user._id });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}


module.exports.message = async (req, res) => {
    try {
        const { token } = req.params;
        const { username, email, subject, message, yourGender, address } = req.body;
        req.session.id = true;
        req.session.token = token;
        if (!req.session.id && !req.session.token) {
            res.status(404).json('Invalid session and token!')
        }
        else if (username.length < 3) {
            res.status(401).json('Username is too short!')
        }
        else if (subject.length < 5 || message.length < 20) {
            res.status(401).json('subject or message is too short!')
        }
        else if (validate.isEmpty(username) || validate.isEmpty(email) || validate.isEmpty(subject) || validate.isEmpty(message) || validate.isEmpty(yourGender) || validate.isEmpty(address)) {
            res.status(402).json('all fields are required!')
        }
        else if (!validate.isEmail(email)) {
            res.status(400).json('Please enter a valid email')
        }
        else if (!yourGender) {
            res.status(400).json('Invalid gender!')
        }
        else {
            const newUser = await sendMessage.create({
                username: req.body.username,
                yourGender: req.body.yourGender,
                address: req.body.address,
                subject: req.body.subject,
                message: req.body.message
            });
            await newUser.save();
            const transporter = nodemailer.createTransport({
                service: process.env.HOST,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            });
            const mailOptions = {
                from: email,
                to: process.env.USER,
                subject: subject,
                text: `I am a ${yourGender} client by name ${username} residing at ${address}. ` + message
            };
            transporter.sendMail(mailOptions, async (err, info) => {
                if (err) {
                    res.status(401).json(err.message)
                } else {
                    res.status(200).json({ id: req.session.id, token: req.session.token, details: info })
                }
            })

        }

    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.content = async (req, res) => {
    try {
        const { _id, token } = req.params;
        return res.status(200).json({ username: req.session.username, _id: _id, token: token, id: req.session.id})
    } catch (error) {
        res.status(500).json(error.message);
    }
}

