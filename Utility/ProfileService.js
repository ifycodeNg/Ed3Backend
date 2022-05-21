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
           where:{
            userID:Id
           }
        })
        return userFound
     }
     

module.exports={
    ProfileCreate,ProfileLookup
}