require('dotenv').config();
const express = require('express');
const connectionz = require('./db/db');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const allRoutes = require('./routes/routes');

//database connection
connectionz();


//setting up port/server
const port = process.env.PORT || 5501

//middelwares

app.use(cors({
    origin: 'https://nodemailer-send-message.vercel.app',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(allRoutes)
app.use(cookieParser())

//listening to port
app.listen(port,
    () => console.log(`Server running on ${process.env.SERVER_URI}`)
);