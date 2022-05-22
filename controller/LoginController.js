let UserService=require("../Utility/SignupService")
let jwt=require("jsonwebtoken")
let secret=require("../config/secret")
let bcrypt=require("bcrypt")

let  Login=  async (req,res)=>{
    let email=req.body.email
    let password=req.body.password
   
    let UserFound=await UserService.checkUser(email)
    
   
   if(UserFound[0] == undefined){
    return   res.status(400).json({
           "errors":{
               "msg":"Invalid Credential"
           }
       })
   }
 
let isMatch=await bcrypt.compare(password,UserFound[0].password)
if(!isMatch){
return   res.status(400).json({
           "errors":{
               "msg":"Invalid Credential"
           }
       })
}
let token=jwt.sign({email},secret.ACCESS_TOKEN_SECRET,{
    expiresIn:'7d'
})
res.cookie('token', token, {
    secure: false, // set to true if your using https
    httpOnly: true,
  });
      res.json({msg:"Login Successful"
    }
  )


}
module.exports=Login