const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    email:{
        type: String,
        trim: true,
        require: true,
        
    },
    yourGender:{
        type: String,
        trim:true,
        require:true,
    },
    address:{
        type: String,
        trim: true,
    },
    message:{
        type: String,
        trim: true,
        require: true
    },
    subject:{
    type:String,
    trim:true,
    require:true
    },
    
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('message', messageSchema);