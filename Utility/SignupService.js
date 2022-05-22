const User = require("../db/sequelize")
const bcrypt = require("bcrypt")
let userFound
let crypto = require("crypto")
let token


let checkUser = async (req) => {
   let email = req

   userFound = User.User.findAll({
      where: {
         email: email
      }
   })

   let AwaituserFound = await userFound

   if (Array.isArray(AwaituserFound) && AwaituserFound.length == 0
   ) {

      return false

   }

   else return userFound
}

let checkUserById = async (id) => {
   let Id = id

   FindUserById = User.User.findAll({
      where: {
         id: Id
      }
   })

   let AwaituserFound = await FindUserById

   if (Array.isArray(AwaituserFound) && AwaituserFound.length == 0
   ) {

      return false

   }

   else return FindUserById
}



let CreateUser = async (req) => {
   let { email, password } = req.body
   let new_password = bcrypt.hashSync(password, 10)
   token = crypto.randomBytes(32).toString("hex")
   let query = await User.User.create({
      email: email,
      password: new_password,
      confirmationToken: token
   })
   let id = query.dataValues.id
   return {

      token: token,
      id: id

   }
}

module.exports = {
   checkUser,
   CreateUser,
   checkUserById

}