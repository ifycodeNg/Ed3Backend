let ProfileService=require("../Utility/ProfileService")
let User=require("../Utility/SignupService")
let jwt=require("jsonwebtoken")
const secret=require("../config/secret")

let ProfileController=async (req,res)=>{
    const token = req.cookies.token
const decrypt = await jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    req.user = {
      id: decrypt.email,
    };
    let UserFound=await User.checkUser(req.user.id)
    if(UserFound == false){
      res.json({message:"User Not Found"})
      
    }
    

    else {
      let ProfileFound=await ProfileService.ProfileLookup(UserFound[0].dataValues.id)
      res.json(ProfileFound)
    }
   

}
module.exports=ProfileController