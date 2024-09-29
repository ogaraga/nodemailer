
require('dotenv').config();
const mongoose = require("mongoose");


const connectionz = async ()=>{
try {
    await mongoose.connect(process.env.DATA_BASE).then(()=>console.log(`Database connected @ `+ mongoose.connection.host)).catch(()=>console.log('Database is disconnected!'))
} catch (error) {
    console.log(error.message)
}
}
module.exports = connectionz;
