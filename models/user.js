const db = require('mongoose');

const userData = new db.Schema({
    userName:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
});

module.exports = db.model('user',userData);