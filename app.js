const express = require("express")
const app = express()
const bodyparser = require("body-parser")

app.use(bodyparser.json())
app.use(bodyparser.urlencoded());

const Appitron = require('./Router/index')

app.use("/test", Appitron)

app.listen(2000,()=>{
    console.log("listing of port 2000");
})