const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    email:{
        type: String, 
        trim: true,
        require: true
    },
    yourGender:{
        type: String,
        require:true
    },
    address:{
        type: String,
        trim: true,
        require:true
    },
    password:{
        type: String,
        trim: true,
        require: true
    },
    password2:{
        type: String,
        trim: true,
        require: true
    },
    
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema);