const multer = require('multer');
const path = require('path');

module.exports=multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let ext = path.extname(file.originalname);
        if(ext!==".jpg"&& ext!==".jpeg"&&ext!==".png"&&ext!==".JPG"&&ext!==".JPEG"&&ext!==".PNG" ){
            cb(new Error("file is not supported"),false); // res.status(403).json()
            return;
        }
        cb(null,true);
    }
})