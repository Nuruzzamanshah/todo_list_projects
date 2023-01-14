/*
*
*Title      : todo_list_projects
*Author     : Md. Nuruzzamn (cpik)
*
*/
var jwt = require('jsonwebtoken');



module.exports=(req, res, next)=>{
 let Token    =   req.headers['token-key']
 jwt.verify(Token,'secretKey123456',function(err, decoded){
    if(err){
        res.status(401).json({status:'unauthorized'});
    }else{
        //Get user name Decoded Token & Add With Req header
       let username = decoded['data']['UserName'];
       req.headers.username=username
        next();
    }
 })
}