let Model=require("../db/sequelize")
let ProfileCreate=async(req,Id)=>{

    for (const key in req.body) {
        let query=  await Model.Usermeta.create({
            userID:Id,
            key:key,
            value:req.body[key]

         })
     }
 
    return {
      
          sucess:true,
          
       
    }
}
let ProfileLookup= async (Id)=>{
     
      userFound=  Model.Usermeta.findAll({
         raw:true,
           where:{
            userID:Id,
            key:"isProfileComplete"
           }
        })
        let AwaituserFound = await userFound

        if (Array.isArray(AwaituserFound) && AwaituserFound.length == 0
        ) {
     
           return false
     
        }
     
        else return AwaituserFound
     }
 
   let UpdateProfile = async (Id)=>{
    let id=Id
    userFound=  Model.Usermeta.update(
        {
        value:1,
        },
        {
            where:{
           id:id
        }
    
    
     })

   }  



   let getInfo= async (Id,key)=>{
     
  
    userFound=  Model.Usermeta.findAll({
        raw:true,
         where:{
          userID:Id,
            key:key
         }
      })
      let AwaituserFound = await userFound
      if (Array.isArray(AwaituserFound) && AwaituserFound.length == 0
      ) {
   
         return null
   
      }
   
      else return AwaituserFound[0].value
   }
module.exports={
    ProfileCreate,ProfileLookup,UpdateProfile,getInfo
}