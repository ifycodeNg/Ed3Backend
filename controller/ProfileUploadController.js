let ProfileCreation=require("../Utility/ProfileService")
let User=require("../db/sequelize")
let UserAccount=require("../Utility/SignupService")
let jwt=require("jsonwebtoken")
const secret=require("../config/secret")

let ProfileUploadController=async (req,res)=>{
    const token = req.cookies.token
const decrypt = await jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    req.user = {
      id: decrypt.email,
    };
    let UserLookUp=await UserAccount.checkUser(req.user.id)
    if(UserLookUp == false){
      res.json({message:"User Not Found"})
    }
   else if(UserLookUp[0].dataValues.isConfirmed == 0){
      res.json({message:"Email Not Verified"})
    }
    else {
      let CreateProfile=await ProfileCreation.ProfileCreate(req,UserLookUp[0].dataValues.id)
      res.json({message:"Profile Created Successfully"})
    }
    
    

}
module.exports=ProfileUploadController