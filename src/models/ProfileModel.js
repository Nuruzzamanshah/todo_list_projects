/*
*
*Title      : todo_list_projects
*Author     : Md. Nuruzzamn (cpik)
*
*/
const mongoose   = require('mongoose');

const DataSchema = mongoose.Schema({
    FirstName    : {type:String},
    LastName     : {type:String},
    EmailAddress : {type:String},
    MobileNumber : {type:String},
    City         : {type:String},
    UserName     : {type:String, unique:true},
    Password     : {type:String}

}, {versionKey   : false});

const ProfileModle = mongoose.model("Profile",DataSchema);

module.exports     =ProfileModle;

