const mysql = require("mysql2")
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "course_moblie_app"
  });


  db.getConnection((err, connection) => {
    if (err) {
        console.log(err);
      console.log("Error connecting to Db");
      return;
    }
    console.log(`Db server is running`);
    connection.release();
  });
  
   module.exports = db.promise(); 