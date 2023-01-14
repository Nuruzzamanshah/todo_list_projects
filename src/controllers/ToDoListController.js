/*
*
*Title      : todo_list_projects
*Author     : Md. Nuruzzamn (cpik)
*
*/
const ToDoListModle = require('../models/ToDoListModel');

exports.CreateToDo=(req,res)=>{
    let reqBody         =req.body;

  let  ToDoSubject      =reqBody['ToDoSubject']
  let  ToDodescription  =reqBody['ToDodescription']
  let  UserName         =req.headers['username']
  let  ToDoStatus       = "New"
  let  ToDoCreateDate   = Date.now();
  let  ToDoUpdateDate   = Date.now();

  let PostBody = {
    UserName           : UserName,
    ToDoSubject        : ToDoSubject,
    ToDodescription    : ToDodescription,
    ToDoStatus         : ToDoStatus,
    ToDoCreateDate     : ToDoCreateDate,
    ToDoUpdateDate     : ToDoUpdateDate
  }
    
    ToDoListModle.create(PostBody,(err,data)=>{
      if(err){
          res.status(400).json({status:'Fail', data:err});
      }else{
          res.status(200).json({status:'Success', data:data});
      }
    })
  }



  exports.SelectToDo=(req,res)=>{
    let UserName =req.headers['username']
    ToDoListModle.find({UserName:UserName},(err,data)=>{
      if(err){
          res.status(400).json({status:'Fail', data:err});
      }else{
          res.status(200).json({status:'Success', data:data});
      }
    })
  }

  exports.UpdateToDo=(req,res)=>{
    let ToDoSubject       = req.body['ToDoSubject'];
    let ToDodescription   = req.body['ToDodescription'];
    let _id               =req.body['_id'];
    let  ToDoUpdateDate   = Date.now();

    let PostBody = {
        ToDoSubject     :ToDoSubject,
        ToDodescription :ToDodescription,
        ToDoUpdateDate  :ToDoUpdateDate,
    }

    ToDoListModle.updateOne({_id:_id},{$set:PostBody}, {upsert:true},(err,data)=>{

        if(err){
            res.status(400).json({status:'Fail', data:err});
        }else{
            res.status(200).json({status:'Success', data:data});
        }
    })

  }




  exports.UpdateStatusToDo=(req,res)=>{
    let ToDoStatus       = req.body['ToDoStatus'];
    let _id               =req.body['_id'];
    let  ToDoUpdateDate   = Date.now();

    let PostBody = {
        ToDoStatus      :ToDoStatus,
        ToDoUpdateDate  :ToDoUpdateDate,
    }

    ToDoListModle.updateOne({_id:_id},{$set:PostBody}, {upsert:true},(err,data)=>{

        if(err){
            res.status(400).json({status:'Fail', data:err});
        }else{
            res.status(200).json({status:'Success', data:data});
        }
    })

  }


  exports.RemoveToDo=(req,res)=>{

    let _id         =req.body['_id'];

    

    ToDoListModle.remove({_id:_id},(err,data)=>{

        if(err){
            res.status(400).json({status:'Fail', data:err});
        }else{
            res.status(200).json({status:'Success', data:data});
        }
    })

  }



  exports.SelectToDoByStatus=(req,res)=>{
    let UserName =req.headers['username']
    let ToDoStatus         =req.body['ToDoStatus'];
    ToDoListModle.find({UserName:UserName,ToDoStatus:ToDoStatus},(err,data)=>{
      if(err){
          res.status(400).json({status:'Fail', data:err});
      }else{
          res.status(200).json({status:'Success', data:data});
      }
    })
  }

  exports.SelectToDoByDate=(req,res)=>{
    let UserName =req.headers['username']
    let FormDate         =req.body['FormDate'];
    let ToDate         =req.body['ToDate'];
    ToDoListModle.find({UserName:UserName,ToDoCreateDate:{$gte:new Date(FormDate),$lte: new Date(ToDate)}},(err,data)=>{
      if(err){
          res.status(400).json({status:'Fail', data:err});
      }else{
          res.status(200).json({status:'Success', data:data});
      }
    })
  }