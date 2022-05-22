let Changepassword = require("../Utility/PasswordService")
let UserService = require("../Utility/SignupService")
const config = require("../config/secret")
let EmailService = require("../Utility/EmailService")
let crypto = require("crypto")
const TokenService = require("../Utility/TokenService")
let token


let PasswordGenLink = async (req, res) => {
  let { email } = req.body
  let UserFound = await UserService.checkUser(req.body.email)
  token = crypto.randomBytes(32).toString("hex")

  console.log(UserFound)

  if (UserFound) {
    let userId = UserFound[0].dataValues.id
    const message = `<a 
    href="${config.baseUrl}/api/password/reset/${userId}/user?token=${token}">
    Click here to change your password
    </a>`;

    let Value = "Password Reset Token"

    await TokenService.SaveToken(token, UserFound[0].dataValues.id, Value)

    await EmailService.SendMail(email, "Password Reset Link", message);

    res.json({
      msg: "Please Check Mail for Password Reset Link"
    })
  }


  else if (!UserFound) {
    res.json({
      msg: "Email Address doesnt Exist"
    })
  }

}



let PasswordResetController = async (req, res) => {

  let { userId } = req.params

  tk = req.query.token

  let findUserByToken = TokenService.findUserByToken(userId, tk)

  let UserFound = await UserService.checkUserById(userId)


  if (!findUserByToken) {
    return res.status(400).send("Invalid link or expired");

  }
  else {
    let passwordChange = await Changepassword(UserFound[0].dataValues.email, req.body.new_password)

    if (passwordChange == undefined) {
      res.json({
        msg: "Password Reset Successfully ",
      }
      )
    }
    else {
      res.status(400).json({
        msg: "Error Occured Please Try Again ",
      }
      )
    }
  }
}

module.exports = {
  PasswordResetController,
  PasswordGenLink

}