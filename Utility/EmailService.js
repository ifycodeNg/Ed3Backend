const User=require("../db/sequelize")
let secret=require("../config/secret")
const axios=require("axios")
const API_KEY=secret.API_KEY
const URL=secret.MAIL_URL
const sender=secret.sender
// send Mail
let SendMail=async(email,subject,message)=>{
  let data= {
    'sender': sender,
    'receiver': email,
    'subject':subject,
    'body': message,
  }
  let headers= {
    headers:{
    'apikey': `${API_KEY}`,
    'Content-Type':'application/json'
      
      }}
    try{ 
        const apiRequest =await axios.post(`${URL}`, data, headers).then((res)=>{
          console.log(res)
        }).catch((error)=>{
          console.log(error)
        })
 
   
    }
    catch(error){
console.log(error)
    }
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