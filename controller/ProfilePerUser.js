let ProfileService=require("../Utility/ProfileService")
let User=require("../Utility/SignupService")


let ProfilePerUserController=async (req,res)=>{
   let userId=req.params.userId
  let UserFound=await User.checkUserById(userId)
    if(UserFound == false){
      res.status(200).json({message:"User Not Found"})
      
    }
    

    else {
        let UserObj={}
        let UserInfo=UserFound[0].dataValues
        UserObj.userId=UserFound[0].dataValues.id
        UserObj.isConfirmed=UserFound[0].dataValues.isConfirmed
        UserObj.isConfirmed=UserFound[0].dataValues.isConfirmed
        UserObj.isBlocked=UserFound[0].dataValues.isBlocked
        UserObj.email=UserFound[0].dataValues.email

      let Uid=UserFound[0].dataValues.id;
    
      let isProfileComplete=await ProfileService.getInfo(Uid,"isProfileComplete")
      const firstname=await ProfileService.getInfo(Uid,"firstName")
      const lastName=await ProfileService.getInfo(Uid,"lastName")
      let gender=await ProfileService.getInfo(Uid,"gender")
      let ProfilePics=await ProfileService.getInfo(Uid,"ProfilePics") 
        UserObj.userId = UserInfo.id
        UserObj.isConfirmed = UserInfo.isConfirmed
        UserObj.isBlocked = UserInfo.isBlocked
        UserObj.email = UserInfo.email


        UserObj.firstname=firstname
        UserObj.lastName=lastName
        UserObj.gender=gender
        UserObj.isProfileComplete=parseInt(isProfileComplete)
        UserObj.ProfilePics=ProfilePics

      
      
      
     

      res.status(201).json(UserObj)
    }
   

}
module.exports=ProfilePerUserController