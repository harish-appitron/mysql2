const db = require("../db")

const GetAllCourse = async(req,res,next)=>{   
    try {
        
        const uid = res.locals.Jwt.UserId;
        const course_name = req.query.course_name;
        const name = `'%${course_name}%'`

         const search = `select * from course where course_name LIKE ${name}`
         const value = [course_name]

         console.log("search", (search))
           
         const [rows] = await db.query(search,value)
         console.log(rows,"rows");
            const cartSql = `select course_id from add_cart where user_id = ?`
            const cartValue = [uid];
            const [usercart] = await db.query(cartSql,cartValue)
            console.log(usercart,"usercart");
           
                const savedsql = `select course_id from saved where user_id = ?`
                const savedvalue = [uid]
            const [usersaved] = await db.query(savedsql,savedvalue)
            console.log(usersaved,"usersaved");
            // for (let index = 0; index < result.length; index++){ 
            //     for (let j =  0; j < userCartData.length ; j++) {
            //         console.log("result", result.id);
            //         console.log(result,"result");
            //         console.log("userCartData", userCartData.course_id);
            //         if (result[index].id == userCartData[j].course_id){

            //             console.log(result.id, userCartData.course_id);
            //             result[index].active = true;
            //             break;
            //         } else {
            //             result[index].active = false
            //         }
            //     }}
             

                   for (let index of rows){
                    
                    for(let j of usercart){
                        console.log(j)
                        if(index.id == j.course_id){
                         index.active = true;
                            console.log(index.active,"index.active");
                            break;
                        }else{
                            index.active = false
                        }
                    }
                    for(let k of usersaved){
                    if(index.id == k.course_id){
                      index.activeSaved =  true;
                        console.log(index.activeSaved,"index.activeSaved");
                           break
                    }else{
                           index.activeSaved = false
                        }
                   }
                }
                    
                // const savedsql = `select course_id from saved where user_id = ?`
                // const savedvalue = [uid]

                // db.query(savedsql,savedvalue,(err2,userSavedData)=>{
                //     console.log(err2,"err2");
                //     console.log(userSavedData,"userSavedData");
                //     if (err2) {
                //         return res.status(400).send("something error")
                //     }
                //       for (let index of result){
                //         for(let k of userSavedData){
                //             if(index.id == k.course_id){
                //                 index.active =  true;
                //                 console.log(index.active,"index.active");
                //                 break
                //             }else{
                //                 index.active = false
                //             }
                //         }
                //       }
                // })
                
                return  res.status(200).json({
                    status:true,
                    data:rows,
                    message:"this is a course"   
                }) 


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status:false,
            data:[],
            msg: "something went wrong"
        })
    }}


    module.exports = {GetAllCourse}