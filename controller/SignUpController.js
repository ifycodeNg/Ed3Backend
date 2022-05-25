let UserService = require("../Utility/SignupService")
let config = require("../config/secret")
let EmailService = require("../Utility/EmailService")

let SignUp = async (req, res) => {
  let UserFound = await UserService.checkUser(req.body.email)

  if (UserFound[0] == undefined) {

    let createUser = UserService.CreateUser(req)
    let email = req.body.email
    let token = await createUser

    const message = `<a 
    href="http://${config.baseUrl}/api/verify/${token.id}/user?token=${token.token}">
    Click Here Verify your Email Address
    </a>`;

    await EmailService.SendMail(email, "Verification Of Email", message);
    res.status(201).json({
      msg: "User Was Created Successfully Please Check Email For Verification"
    }
    )

  }
  else if (UserFound[0].email) {
    return res.status(200).json({
      "errors": {
        "msg": "This Email already exist"
      }
    })
  }


}
module.exports = SignUp