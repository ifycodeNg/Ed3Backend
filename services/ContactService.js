const Model = require('../db/sequelize');

const AddContact = async (UserInfo) => {
  console.log("hello2")
  const query = Model.Contact.create({
    directory_id: UserInfo.directoryId,
    mobileNumber: UserInfo.telephone,
  
  });

  return query;
};
const AddContacts = async (UserInfo) => {
  console.log("hello")
        for (let i = 0; i < UserInfo['mobileNumbers'].length ; i++) {
            const query = Model.Contact.create({
                directory_id: UserInfo['directoryId'],
                mobileNumber: UserInfo['mobileNumbers'][i]
                
             
          
            });
        
 
  
}
    return true;
  };
  

module.exports = {AddContact , AddContacts};
