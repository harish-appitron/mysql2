const {SignUpSchema, Loginschema ,Password_validation} = require("./user_schema")

const AddUserValidate = async(req,res,next)=>{
        const value = await SignUpSchema.validate(req.body);
         // console.log("value",value);
         if(value.error){
            return res.json({
                 success: 0,
                 massage: value.error.details[0].message
             })
         //    console.log(value.error,"err");
         }else{
             next();
         }
     
     }


 const AddLoginValidate =  async(req,res,next)=>{
   const value = await Loginschema.validate(req.body);
       //  console.log("value",value);
       if(value.error){
            return res.json({
                success: 0,
                message: value.error.details[0].message
            }) 
        }else {
        next();
    }
}



const AddChangePassword =  async(req,res,next)=>{
    const value = await Password_validation.validate(req.body);
   //  console.log("value",value);
    if(value.error){
        return res.json({
            success: 0,
            message: value.error.details[0].message
        }) 
    }else {
    next();
   }
} 
     module.exports  = {AddUserValidate, AddLoginValidate,AddChangePassword}