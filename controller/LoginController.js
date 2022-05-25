let UserService = require("../Utility/SignupService")
let jwt = require("jsonwebtoken")
let secret = require("../config/secret")
let ProfileService=require("../Utility/ProfileService")
let bcrypt = require("bcrypt")

let Login = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    let UserFound = await UserService.checkUser(email)

    if (UserFound[0] == undefined) {
        return res.status(200).json({
            "errors": {
                "msg": "Invalid Credential"
            }
        })
    }

    let isMatch = await bcrypt.compare(password, UserFound[0].password)
    if (!isMatch) {
        return res.status(200).json({
            "errors": {
                "msg": "Invalid Credential"
            }
        })

    }

        const UserInfo = UserFound[0].dataValues;
        let Uid=UserFound[0].dataValues.id;
        const UserObj={}
        let isProfileComplete=await ProfileService.getInfo(Uid,"isProfileComplete")
        const firstname=await ProfileService.getInfo(Uid,"firstName")
        const lastName=await ProfileService.getInfo(Uid,"lastName")
        let gender=await ProfileService.getInfo(Uid,"gender")
          UserObj.userId = UserInfo.id
          UserObj.isConfirmed = UserInfo.isConfirmed
          UserObj.isBlocked = UserInfo.isBlocked
          UserObj.email = UserInfo.email
  
        
        
        let ProfilePics=await ProfileService.getInfo(Uid,"ProfilePics") 

        console.log(lastName)

       UserObj.isProfileComplete= parseInt(isProfileComplete)
  
        UserObj.firstname=firstname
        UserObj.lastName=lastName
        UserObj.gender=gender
        
        UserObj.ProfilePics=ProfilePics


        let token = jwt.sign({ UserId: UserObj.id, role: UserObj.role, isProfileComplete: UserObj.isProfileComplete }, secret.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d'
        })
        UserObj.token=token
       
        res.status(201).json(
           UserObj


        
        )

    }
    

module.exports = Login