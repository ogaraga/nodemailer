require('dotenv').config();
const router = require('express').Router();
const sessions = require('express-session');
const mongoStore = require('connect-mongodb-session')(sessions);
const {register,login,content,message, home} = require('../controller/controller');
const  auth = require('../middleware/auth');

//connecting session to mongodb atlas
const store = new mongoStore({
    collection: 'Users',
    connectionOptions:{
        serverSelectionTimeoutMS: 120000 //server times out after 2 minutes delay
    }
});

//session middleware
router.use(sessions({
    secret: process.env.SECRET_SESSION,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000 * 30//lasts for 1 hr
    },
    store:store
}));

//register a client
router.post('/log/register',register)
//client is logging in

router.post('/log/login',login)

//client is authenticated to send a message to the server and receive a response.
router.post('/log/message/:token',auth, message)

//the protected content area with jwt
router.get('/log/content/:_id/:token',auth, content)
router.get('/', home)

module.exports = router;
