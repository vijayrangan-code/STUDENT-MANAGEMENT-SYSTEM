const mysql = require("mysql");

//mysql
const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.view = (req, res) => {
  //check database connection

  con.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("select * from details", (err, rows) => {
      connection.release();
      if (!err) {
        // console.log("good");
        res.render("home", { rows });
      } else {
        console.log("err in isting data" + err);
      }
    });
    // console.log("connection success");
  });
};
exports.adduser = (req, res) => {
  res.render("adduser");
};

exports.save = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let location = req.body.location;
    let email = req.body.email;
    let dob = req.body.dob;
    let education = req.body.education;
    // const { FirstName , LastName, Location, Email, DOB, Education } = req.body;
    connection.query(
      "insert into details(FIRSTNAME,LASTNAME,LOCATION,EMAIL,DOB,EDUCATION) values(?,?,?,?,?,?)",
      [ firstname , lastname, location,  email, dob, education],
      (err, rows) => {
        connection.release();
        if (!err) {
            res.render("adduser",{ msg: "Student Details Added Successfully" });
        } else {
          console.log("err in isting data" + err);
        }
      }
    );
    // console.log("connection success");
  });
};

exports.edituser = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) throw err;
        // get ID from URL
        let id = req.params.id
        connection.query("select * from details where ID = ?",[id] , (err, rows) => {
          connection.release();
          if (!err) {
            
            res.render("edituser", { rows });
          } else {
            console.log("err in isting data" + err);
          }
        });
        
      });
    
  };
  exports.edit = (req, res) => {
    con.getConnection((err, connection) => {
      if (err) throw err;
      let firstname = req.body.firstname;
      let lastname = req.body.lastname;
      let location = req.body.location;
      let email = req.body.email;
      let dob = req.body.dob;
      let education = req.body.education;
      let id = req.params.id
      // const { FirstName , LastName, Location, Email, DOB, Education } = req.body;
      connection.query(
        "update details set FIRSTNAME=?,LASTNAME=?,LOCATION=?,EMAIL=?,DOB=?,EDUCATION=? where ID=?",
        [ firstname , lastname, location,  email, dob, education,id],
        (err, rows) => {
          connection.release();
          if (!err) {
            con.getConnection((err, connection) => {
                if (err) throw err;
                // get ID from URL
                let id = req.params.id
                connection.query("select * from details where ID = ?",[id] , (err, rows) => {
                  connection.release();
                  if (!err) {
                    
                   
                    res.render("edituser",{rows, msg: "Student Details Updated Successfully" });
                  } else {
                    console.log("err in isting data" + err);
                  }
                });
                
              });
              
          } else {
            console.log("err in isting data" + err);
          }
        }
      );
      
    });
  };
  exports.delete=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        let id = req.params.id
        connection.query("delete from details where ID= ?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/")

            }else{
                console.log(err);
            }

        });

    })

    

  };
