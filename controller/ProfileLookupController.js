let ProfileService=require("../Utility/ProfileService")
let User=require("../Utility/SignupService")
let jwt=require("jsonwebtoken")
const secret=require("../config/secret")

let ProfileController=async (req,res)=>{
  const authorization = req.headers['authorization'];
  if (!authorization) throw new Error('You need to login.');

  const token = authorization.split(' ')[1];

  const { UserId } = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);

  let UserFound=await User.checkUserById(UserId)
    if(UserFound == false){
      res.json({message:"User Not Found"})
      
    }
    

    else {
      let UserInfo=UserFound[0].dataValues
      let Uid=UserFound[0].dataValues.id
      let UserObj={}
        UserObj.userId=UserInfo.id
        UserObj.isConfirmed=UserInfo.isConfirmed
        UserObj.isBlocked=UserInfo.isBlocked
        UserObj.email=UserInfo.email

  
      let firstname=await ProfileService.getInfo(Uid,"firstName")
      let lastName=await ProfileService.getInfo(Uid,"lastName")
      let gender=await ProfileService.getInfo(Uid,"gender")
      let isProfileComplete=await ProfileService.getInfo(Uid,"isProfileComplete")
      let ProfilePics=await ProfileService.getInfo(Uid,"ProfilePics") 

      UserObj.firstname=firstname
      UserObj.lastName=lastName
      UserObj.gender=gender
      UserObj.isProfileComplete=parseInt(isProfileComplete)
      UserObj.ProfilePics=ProfilePics


      res.status(201).json(UserObj)
    }
    }
   


module.exports=ProfileController