const db = require("../db")
const moment = require("moment")

const Getsaved = async(req,res,next)=>{
    try {
 const uid = res.locals.Jwt.UserId
 console.log(uid,"uid");

   const sql = `select course_name,category,page_image,details,about_course,duration from saved join course on saved.course_id = course.id where saved.user_id = ?` 

const value = [uid]
const [rows] = await db.query(sql,value) 
console.log(rows,"rows");

        return res.status(200).json({
            status:true,
            data:rows,
            msg: " this is list "
        })
         
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status:false,
            data:[],
            msg :"something went wrong"
        })
    }
}



// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//


const AddToSaved = async(req,res,next)=>{
    try {
        const uid = res.locals.Jwt.UserId
        const course_id = req.body.course_id

        if (!course_id) return res.status(400).json({
            msg: "Please pass the course Id"
        })
         
        const currentDate = moment().format('YYYY-MM-DD');
        console.log(currentDate, "currentdate");
        const  Sql = `select * from course where id = ?`
        let values = [course_id]

        const [result] = await db.query(Sql,values)
      
            if(result.length===0){
                return res.status(400).json({
                    status:false,
                    data:[],
                    msg:"this course_id is not exist"
                })}
                else{
                let sql = `select * from saved where user_id = ? AND course_id = ?`
                let value = [uid,course_id]

                const [result1] = await db.query(sql,value)
                
                    if(result1.length>0){
                        return res.status(400).json({
                            status:true,
                            data:[],
                            msg:"this course_id is already saved"
                        })
                    }else{
                        const sql = `INSERT into saved (user_id, course_id, create_at, updated_at, status) values (?, ?, ?, ?, ?)`
                        const value = [uid, course_id, currentDate, currentDate,"1"]

                     const [result3] = await db.query(sql,value)
                     console.log(result3,"result3");
                         
                                return res.status(200).json({
                                    status: true,
                                    data:[],
                                    msg: "Course saved !"
                                })
                            }
                        }  
     } catch(error){
      console.log(error);
      return res.status(400).json({
        status:false,
        data:[],
        msg: "something went wrong"
      })
    }}




    
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//


const Deletetosaved = async(req,res,next)=>{
    try {
        const uid = res.locals.Jwt.UserId
        const savedId = req.body.id
        const sql = `delete from saved where user_id = ? and id = ?`
        const value = [uid,savedId]

        const [rows] = await db.query(sql,value)
        console.log(rows,"rows");
      
                return res.status(200).json({
                    status:true,
                    data:[],
                    msg:"course remove"
                })
            
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status:false,
            data:[],
            msg : "something went wrong"
        })
    }
}


module.exports = {Getsaved, AddToSaved, Deletetosaved}