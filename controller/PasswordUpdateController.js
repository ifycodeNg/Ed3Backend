let Changepassword = require("../Utility/PasswordService")
let jwt = require("jsonwebtoken")


let PasswordResetController = async (req, res) => {
  const token = req.cookies.token
  const decrypt = await jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
  req.user = {
    id: decrypt.email,
  };
  const password = req.body.password
  let passwordChange = await Changepassword(req.user.id, password)

  if (passwordChange == undefined) {
    res.json({
      msg: "Password Updated Successfully ",
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

module.exports =
  PasswordResetController