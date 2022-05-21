const User=require("../db/sequelize")
// send Mail
let SendMail=async(req)=>{
   
 }
 
 let checkToken=async(token)=>{
    userFound=  User.User.findAll({
        where:{
            confirmationToken:token
        }
     })
     return userFound
    
 }
 

//Update column for isConfirmed
let confirmEmail=async(Id)=>{
    let id=Id
    userFound=  User.User.update(
        {
        isConfirmed:1,
        },
        {
            where:{
           id:id
        }
    
    
     })
    
 }
 
module.exports={
    confirmEmail,
    SendMail,
    checkToken
} 