const db =  require("../db")

const lesson  = async(req,res,next)=>{
    try {
        const uid = res.locals.Jwt.UserId
        console.log(uid,"uid");
        const course_id = req.body.course_id
    
        if (!course_id) return res.status(400).json({
            msg: "Please pass the course Id"
        })


        const sql = ` select * from lesson where course_id = ? `
         const value = [course_id ]
         const [rows] = await db.query(sql,value)
       
                return res.status(200).json({
                    status:true,
                    data:rows,
                    msg:"this is lesson !"
                })
     
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status:false,
            data:[],
            msg: "something went wrong"
        })
    }
}

module.exports = {lesson}