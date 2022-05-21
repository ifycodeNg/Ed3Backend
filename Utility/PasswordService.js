let bcrypt=require("bcrypt");
const secret = require("../config/secret");
const jwt=require("jsonwebtoken")
const User=require("../db/sequelize")

let Changepassword=async (req)=>{
const token = req.cookies.token
const decrypt = await jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    req.user = {
      id: decrypt.email,
    };
let password=req.body.password
let new_password= bcrypt.hashSync(password,10)
let id=req.user.id
userFound=  User.User.update(
    {
    password:new_password,
    },
    {
        where:{
       email:id
    }


 })



}

module.exports=Changepassword