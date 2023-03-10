/*
*
*Title      : todo_list_projects
*Author     : Md. Nuruzzamn (cpik)
*
*/
const ProfileModle = require('../models/ProfileModel');
var jwt = require('jsonwebtoken');

exports.CreateProfile=(req,res)=>{
  let reqBody        =req.body;
  ProfileModle.create(reqBody,(err,data)=>{
    if(err){
        res.status(400).json({status:'Fail', data:err});
    }else{
        res.status(200).json({status:'Success', data:data});
    }
  })
}

exports.UserLogine=(req,res)=>{
  let UserName    = req.body['UserName'];
  let Password    = req.body['Password'];
  ProfileModle.find({UserName:UserName,Password:Password},(err,data)=>{
    if(err){
      res.status(400).json({status:'Fail', data:err});
    }else{
      if(data.length>0){
        //create Auth Token
        let payload = {
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
          data:data[0]
        }
        let token = jwt.sign(payload, 'secretKey123456');

        res.status(200).json({status:'Success',token:token, data:data[0]});
      }else{
        res.status(401).json({status:'unauthorized'});
      }
    }
  })
}


exports.SelectProfile=(req,res)=>{
  let UserName       =req.headers['username']
  ProfileModle.find({UserName:UserName},(err,data)=>{
    if(err){
        res.status(400).json({status:'Fail', data:err});
    }else{
        res.status(200).json({status:'Success', data:data});
    }
  })
}

exports.UpdateProfile=(req,res)=>{
  let UserName       =req.headers['username']
  let  reqBody       =req.body;
  ProfileModle.updateOne({UserName:UserName},{$set:reqBody}, {upsert:true}, (err,data)=>{
    if(err){
      res.status(400).json({status:'Fail', data:err});
    }else{
        res.status(200).json({status:'Success', data:data});
    }
  })

  
}
