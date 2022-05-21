let UserService=require("../Utility/SignupService")
let config=require("../config/secret")

let SignUp=  async (req,res)=>{
    let UserFound=await UserService.checkUser(req.body.email)
    
    console.log(UserFound)
   if(UserFound[0] == undefined){
 let createUser= UserService.CreateUser(req)

 let token=await createUser

    const message = `${config.baseUrl}/api/verify/${token.id}/user?token=${token.token}`;

   // await LoginService.SendMailsendEmail(email, "Verify Email", message);
    res.json({msg:"User Was Created Successfully Please Check Email For Verification",
   message:message
        }
          )

   }
  else if(UserFound[0].email){
    return   res.status(400).json({
           "errors":{
               "msg":"This Email already exist"
           }
       })
   }
 
   
}
module.exports=SignUp