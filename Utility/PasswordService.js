let bcrypt=require("bcrypt");

const User=require("../db/sequelize")

let Changepassword=async (email,password)=>{

let new_password= bcrypt.hashSync(password,10)

let id=email

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