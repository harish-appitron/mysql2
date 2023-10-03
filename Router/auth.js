const express = require("express")

const name = express.Router();

const VerifyToken = require("../JWT/index")

const {AddUserValidate, AddLoginValidate, AddChangePassword}  = require("../validation/user/user_validation")

const {signupApi, loginApi, change_password, updateProfile} = require("../controllers/profile")

const {TestApi, addpayment} = require("../controllers/test")

const {lesson} =require("../controllers/lesson")

const {getquiz, GetAllQuiz, Checkanwser} = require("../controllers/quiz")

const {CartDetails,AddToCart, DeleteCart} = require("../controllers/cart")

const {Getsaved, AddToSaved, Deletetosaved} = require("../controllers/saved")

const {GetAllCourse} = require("../controllers/course")

const {upload,Upload_profile} = require("../controllers/image")

name.post("/Api",AddUserValidate,signupApi)

name.post("/login", AddLoginValidate, loginApi)

name.patch("/changepassword", VerifyToken.VerifyToken,AddChangePassword, change_password)

name.put("/updateProfile",VerifyToken.VerifyToken,updateProfile)

name.get("/payment", VerifyToken.VerifyToken, TestApi)

name.post("/addpayment", VerifyToken.VerifyToken, addpayment)

name.get("/lesson",VerifyToken.VerifyToken, lesson)

name.get("/quiz",VerifyToken.VerifyToken,getquiz)

name.get("/GetAllQuiz",VerifyToken.VerifyToken,GetAllQuiz)

name.get("/Checkanwser",VerifyToken.VerifyToken,Checkanwser)

name.get("/CartDetails",VerifyToken.VerifyToken,CartDetails)    

name.post("/AddToCart",VerifyToken.VerifyToken,AddToCart)

name.delete("/DeleteCart",VerifyToken.VerifyToken,DeleteCart)

name.get("/Getsaved",VerifyToken.VerifyToken,Getsaved)

name.post("/AddToSaved",VerifyToken.VerifyToken,AddToSaved)

name.delete("/Deletetosaved",VerifyToken.VerifyToken, Deletetosaved)

name.get("/GetAllCourse",VerifyToken.VerifyToken,GetAllCourse)

name.put("/Upload_profile",VerifyToken.VerifyToken,upload.single("image"),Upload_profile)

module.exports = name