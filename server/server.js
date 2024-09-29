require('dotenv').config();
const express = require('express');
const connectionz = require('./db/db');
const app = express();
const cors = require('cors');
const cookieParser =require('cookie-parser');
const allRoutes = require('./routes/routes');

//database connection
connectionz();


//setting up port/server
const port = process.env.PORT || 5501

//middelwares
if(process.env.NOD_ENV){

    app.use(cors({
        origin:['https://nodemailer-send-message.vercel.app/','https://nodemailer-ap1.vercel.app'],
        methods: ['POST','GET','PUT','DELETE'],
        credentials: true
    }))
}else{
    
app.use(cors({
    origin:['http://localhost:5173','http://localhost:5500'],
    methods: ['POST','GET','PUT','DELETE'],
        credentials: true
}))
}
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(allRoutes)
app.use(cookieParser())

//listening to port
app.listen(port,
     ()=>console.log(`Server running on port ${port}`)
);