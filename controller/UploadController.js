const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const CSVToJSON = require('csvtojson');


let uploadController=(req,res)=>{
        if (!req.file) {
          console.log("No file received");
          return res.send({
            success: false
          });
      
        } else {
          console.log('file received');
          console.log(req.file)

         
// convert users.csv file to JSON array
CSVToJSON().fromFile(`${req.file.path}`)
    .then(users => {
        console.log(users);
      //  adduserToDb(users)
    }).catch(err => {
        // log error if any
        console.log(err);
    });
          return res.send({
            success: true
          })
        
}
    }
module.exports=uploadController