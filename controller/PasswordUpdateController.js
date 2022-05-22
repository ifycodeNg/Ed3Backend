let Changepassword=require("../Utility/PasswordService")

let PasswordResetController=async (req,res)=>{
    let passwordChange=await Changepassword(req)

    if(passwordChange == undefined){
        res.json({msg:"Password Updated Successfully ",
             }
               )
    }
    else{
        res.status(400).json({msg:"Error Occured Please Try Again ",
    }
      )
    }
   
}

module.exports=
    PasswordResetController