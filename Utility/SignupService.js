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
   let metaObj = {}
   metaObj.role = "SuperAdmin"
   metaObj.isProfileComplete = parseInt(0)

   token = crypto.randomBytes(32).toString("hex")
   let query = await User.User.create({
      email: email,
      password: new_password,
      confirmationToken: token
   })

   let id = query.dataValues.id
   for (const key in metaObj) {
      let meta_query = await User.Usermeta.create({
         userID: id,
            key: key,
            value: metaObj[key]
   
      })
      
   }
 
   return {

      token: token,
      id: id

   }
}
let checkMeta = async (UserId) => {
   FindUserById = User.Usermeta.findAll({
      where: {
         userID: UserId
      }
   })

   let AwaituserFound = await FindUserById

   if (Array.isArray(AwaituserFound) && AwaituserFound.length == 0
   ) {

      return false

   }

   else return FindUserById
}
module.exports = {
   checkUser,
   CreateUser,
   checkUserById,
   checkMeta

}