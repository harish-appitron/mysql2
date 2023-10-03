const multer = require("multer")
const db = require("../db")


const FileStroage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, "./image");
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + "--" + file.originalname);
    }
})

const upload = multer({storage: FileStroage})


const Upload_profile = async(req,res,next)=>{
    try { 
        console.log(req.file.path);
        let id = res.locals.Jwt.UserId
        let image = req.file.path
        const sql = `update login_profile SET image = ? where id = ?`
        const value =[image,id]
        const [rows] = await db.query(sql,value)
   
        console.log(rows,"rows");
           if(rows.affectedRows >0){
                return res.status(200).json({
                    status:true,
                    data:[],
                    msg:"image upload successfull"
                })
            }
    } catch(error){
     console.log(error);   
     return res.status(400).json({
        status:false,
        data:[],
        msg:" something went wrong"
     })
    }
}




module.exports = {upload,Upload_profile}