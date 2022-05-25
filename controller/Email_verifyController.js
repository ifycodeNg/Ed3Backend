let EmailVerifyService=require("../Utility/EmailService")


let Email_Verify=  async (req,res)=>{

    let tokenFound=await EmailVerifyService.checkToken(req.query.token)
   if(!tokenFound){
      res.status(200).json({msg:"Invalid link",
    }
  )

   }
  else if(tokenFound){
    let isConfirmed=await EmailVerifyService.confirmEmail(req.params.id)
   
  res.redirect("https://ed3.apptestenv.com/authentication/login")
   }
 
   
}
module.exports=Email_Verify