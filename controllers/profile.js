const db = require("../db")
const {authData} = require("../JWT/index")
const bcrypt = require("bcryptjs")
const salt = 10 

const signupApi = async (req, res, next) => {
    try {
        let name = req.body.name
        let email = req.body.email
        const emailcheck =  `select * from login_profile where email = ?`
        const value = [email]
        const [result] = await db.query(emailcheck, value)

        console.log(result, "result");

            if (result.length > 0) {
                return res.status(400).json({
                    status: false,
                    data: null,
                    message: "email is duplicate"
                })
            } else {
                bcrypt.hash(req.body.password, salt, async (err,hash) => {
                    if(err) throw err
                    let sql = `insert into login_profile (name, email, password) VALUES ("${name}","${email}","${hash}")`
                    const [Rows] = await db.query(sql)      
                    console.log("result", result);  

                         let token = authData(Rows.insertId);
                          return  res.json({
                                status: true,
                                token,
                                data: null,
                                message: "Success"
                            })
                  })
          }; 
  } catch (error) {
        console.log(error);
   return res.status(400).json({
    status:false,
    data:[],
    msg:" something went wrong !"
   })
  }
 }


 // ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//

const loginApi = async(req,res,next)=>{
    try {
        let {email, password} = req.body
        let logincheck = `select * from login_profile where email = ?`;
        let value = [email]
        const [result] = await db.query(logincheck,value)
            if (!result.length) {
                return res.status(401).send({
                    msg: 'Email is incorrect!'
                });
            }
            bcrypt.compare(password, result[0].password, (err, isMatch) => {
                if (err) {
                    res.status(500).send({ massage: "somthing error" })
                }
                if (isMatch) {
                    console.log("result.insertId", result[0].id);
                    const token = authData(result[0].id);
                    res.json({
                        status: true,
                        token,
                        data: null,
                        message: "Successfull login"
                    })
                } else {
                    return res.json({
                        status: true,
                        data: null,
                        message: "Password not match"
                    })
                }
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



 // ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//



const change_password = async(req,res,next)=>{
    try {
        let id = res.locals.Jwt.UserId
        console.log(id ,"id");
      let old_password   = req.body.old_password 
      console.log(old_password,"old_password");
      
      let new_password = req.body.new_password
       console.log(new_password,"nw_password");

      let sql = `select password from login_profile where id = ? `
      const value = [id]
      const [result] = await db.query(sql,value)
      console.log(result,"result");
      bcrypt.compare(old_password, result[0].password, (err,isMatch)=>{
        if (err) throw err
        if(isMatch){ 
              bcrypt.hash(new_password, salt, async (err, hash) => {
                  console.log(err);
                  let sql = `update login_profile set password = ? where id = ?`
                  let value = [hash,id]
                  const [rows] = await db.query(sql,value)
                console.log(rows,"rows");
                       if (rows.affectedRows> 0){
                          return res.status(200).json({
                              status:true,
                              data:[],
                              msg:'password has changed'
                          });
                      }}
                      )  
                  }})
      
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status:false,
        data:[],
        msg: "something went worng"
      })
    }
  }

 // ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
// ==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//



  const updateProfile = async (req, res, next) => {
    try {
        let id = res.locals.Jwt.UserId
        console.log("id", id);
        let name = req.body.name
        let email = req.body.email
        const sql = `select * from login_profile where email = ?`
             const value = [email]
             const [result] = await db.query(sql,value)

                if(result.length>0){
                    return res.status(400).json({
                        status: false,
                        data: null,
                        message: "email is duplicate"
                    })
                }else{
                    const update = `update login_profile SET name = ?, email = ? where id = ?`

            const value = [name, email, id]
            const [rows] = await db.query(update,value)
console.log(rows,'rows');

                if(rows.affectedRows>0){
                    return res.json({
                        status: true,
                        data: rows,
                        message: "user update successfully"
                    })
                }}
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status:false,
            data:[],
            msg :"something went wrong"
        })
    }
}

module.exports = {signupApi, loginApi, change_password, updateProfile}