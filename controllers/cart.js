const db =  require("../db")
const moment = require("moment")

const CartDetails = async (req, res, next) => {
   try {
    const id = res.locals.Jwt.UserId;
      
      const sql = `SELECT course_name,category,page_image,details,about_course,duration from add_cart join course on add_cart.course_id = course.id WHERE add_cart.user_id = ?`

      const value = [id]

      const [result] = await db.query(sql,value)

                  return res.json({
                      status: true,
                      data: result,
                      message: "list of course"
                  })
              
            }catch(e){
              console.log(e);
              return res.status(400).json({
                  status: false,
                  data: null,
                  msg: "somthing error"
              })
          }}


          
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//



const AddToCart = async (req, res, next) => {

    try {   
        const id = res.locals.Jwt.UserId
        console.log(id, "id");
        const course_id = req.body.course_id;

            if (!course_id) return res.status(400).json({
                msg: "Please pass the course Id"
            })

        const currentDate = moment().format('YYYY-MM-DD');
        console.log(currentDate, "currentdate");
        console.log(course_id);

        let sql = `select * from add_Cart where user_id = ? AND course_id = ?`
        let value = [id, course_id]

        const [result] = await db.query(sql,value)
        
            if(result.length>0){
                return res.status(400).json({
                    status:true,
                    data:[],
                    msg:"this course_id already purchased"
                })
            }else{
                 const sql = `INSERT into add_cart (user_id, course_id, status, create_at, update_at) values (?, ?, ?, ?, ?)`
        const value = [id,  course_id, "1", currentDate, currentDate]

        const [rows] = await db.query(sql,value)
         console.log(rows,"rows");
        
                return res.status(200).json({
                    status: true,
                    data: [],
                    msg: "Course added in cart !"
                })
            }

    }catch (error) {
        console.log(error);
        return res.status(400).json({
            status:false,
            data:[],
            msg: "something went wrong"
        })
    }

}


// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//




const DeleteCart = async(req,res,next)=>{
    try {
        const userId = res.locals.Jwt.UserId
        const cartId = req.body.id
        const sql = `delete from add_cart where user_id = ? and id = ?`
        const value = [userId,cartId]
        const [rows] = await db.query(sql,value)
        console.log(rows,"rows");

        return res.status(200).json({
            status:true,
            data:[],
            msg:'this cart id deleted'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status:false,
            data:[],
            msg: "somthing went wrong"
        })
    }
}




module.exports = {CartDetails, AddToCart, DeleteCart}