const mongoose = require('mongoose');
let env = require('dotenv');
let url = env.config().parsed.URI;
mongoose.connect(url).then(response => console.log('atlas connected')).catch(err => console.log(err))
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },email:String,
    phone:Number,
    city:String,
    gender:String,
    dob:String,
    date:String,
    qualification:String
})

module.exports = mongoose.model('users', userSchema)
