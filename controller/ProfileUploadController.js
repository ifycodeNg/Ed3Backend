let ProfileCreation=require("../Utility/ProfileService")
let UserAccount=require("../Utility/SignupService")
let jwt=require("jsonwebtoken")
const secret=require("../config/secret")

let ProfileUploadController=async (req,res)=>{
  if (!req.file) {
    const token = req.cookies.token
const decrypt = await jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    req.user = {
      id: decrypt.id,
    };
    let UserLookUp=await UserAccount.checkUserById(req.user.id)
    if(UserLookUp == false){
      res.json({message:"User Not Found"})
    }
   else if(UserLookUp[0].dataValues.isConfirmed == 0){
      res.json({message:"Email Not Verified"})
    }
    else {
      let CreateProfile=await ProfileCreation.ProfileCreate(req,UserLookUp[0].dataValues.id)
      let ProfileDetail=await ProfileCreation.ProfileLookup(UserLookUp[0].dataValues.id)
      let UpdateProfile=await ProfileCreation.UpdateProfile( ProfileDetail[1].dataValues.id)
      res.json({message:"Profile Created Successfully"})
    }
    
   

  } else {
    let profileImage=req.file.path
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
          let CreateProfile=await ProfileCreation.ProfileCreate(req,UserLookUp[0].dataValues.id,profileImage)
          res.json({message:"Profile Created Successfully"})
        }
        
        
  }




    

}
module.exports=ProfileUploadController