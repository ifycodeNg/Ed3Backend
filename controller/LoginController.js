let UserService = require("../Utility/SignupService")
let jwt = require("jsonwebtoken")
let secret = require("../config/secret")
let bcrypt = require("bcrypt")

let Login = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    let UserFound = await UserService.checkUser(email)
    let User_Meta = await UserService.checkMeta(UserFound[0].id)

    if (UserFound[0] == undefined) {
        return res.status(200).json({
            "errors": {
                "msg": "Invalid Credential"
            }
        })
    }

    let isMatch = await bcrypt.compare(password, UserFound[0].password)
    if (!isMatch) {
        return res.status(400).json({
            "errors": {
                "msg": "Invalid Credential"
            }
        })

    }

    if (parseInt(User_Meta[1].dataValues.value) === 1) {
        let obj = {}
        obj.isBlocked =UserFound[0].isBlocked
        obj.isConfirmed = UserFound[0].isConfirmed
        obj.role = User_Meta[0].dataValues.value
        obj.id = User_Meta[0].dataValues.userID
        obj.isProfileComplete = parseInt(User_Meta[1].dataValues.value) 
        obj.firstName = User_Meta[2].dataValues.value
        obj.lastName = User_Meta[3].dataValues.value


        let token = jwt.sign({ id: obj.id, role: obj.role, is_profile_complete: obj.is_profile_completed }, secret.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d'
        })
        obj.token=token
       
        res.status(201).json({
            firstName: obj.firstName ,
            lastName: obj.lastName ,
            role: obj.role,
            jwtoken: token,
            isProfileComplete: parseInt(obj.isProfileComplete) ,
            profilecPics: obj.profile_pics || null ,
            isBlocked : obj.isBlocked ,
            isConfirmed : obj.isConfirmed


        }
        )

    }
    else {
        let obj = {}
        obj.role = User_Meta[0].dataValues.value
        obj.id = User_Meta[0].dataValues.userID
        obj.isBlocked =UserFound[0].isBlocked
        obj.isConfirmed = UserFound[0].isConfirmed
        obj.isProfileComplete = User_Meta[1].dataValues.value


        let token = jwt.sign({ id: obj.id, role: obj.role, is_profile_complete: obj.is_profile_completed }, secret.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d'
        })
       
        res.status(201).json({
            firstName: obj.firstName || null,
            lastName: obj.lastName || null,
            role: obj.role,
            jwtoken: token,
            isProfileComplete: parseInt(obj.isProfileComplete) ,
            profilePics: obj.profile_pics || null ,
            isBlocked : obj.isBlocked ,
            isConfirmed : obj.isConfirmed

        }
        )

    }


}
module.exports = Login