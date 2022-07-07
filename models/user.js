const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-aditya:adityabunty@cluster0.ork3b.mongodb.net/Ecra').then(console.log("Data base is Connected successfully")).catch((err)=>{
    console.log(err);
});

const userSchema = new mongoose.Schema({
    name : {type :String , required : true},
    score : Number
});

const userData = new mongoose.model("userData",userSchema);

module.exports = {userData};