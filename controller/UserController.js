const { User } = require("../db/sequelize")
const { CreateUser } = require("../Utility/SignupService")



let UserCreate=async(req,res)=>{
    let CreateUser= await CreateUser(req)
    return res.json("User Created Successfully")
}

let BlockUser=async (req,res)=>{
    let BlockUser=await BlockUser()
}

let UnBlockUser=async (req,res)=>{
    let BlockUser=await BlockUser()
}

let ListAllUser=async (req,res)=>{
    let BlockUser=await BlockUser()
}