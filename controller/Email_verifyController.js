let Email_VerifyService=require("../Utility/EmailService")


let Email_Verify=  async (req,res)=>{

    let tokenFound=await Email_VerifyService.checkToken(req.query.token)
   if(!tokenFound){
      res.json({msg:"Invalid link",
    }
  )

   }
  else if(tokenFound){
    let isConfirmed=await Email_VerifyService.confirmEmail(req.params.id)
   
  res.json({
               "msg":"Email Verified Succesfully"
        
  })
   }
 
   
}
module.exports=Email_Verify