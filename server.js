const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const server = express();
const cors = require("cors");

server.use(bodyParser.json());
server.use(cors());

// Establishing connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbschool",
});

db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
  } else {
    console.log("Successfully Connected to DB");
  }
});

// Establish the Port
server.listen(3000, function check(error) {
  if (error) {
    console.log("Error....dddd!!!!");
  } else {
    console.log("Server Started on Port 3000");
  }
});

// Create the student Records with email and phone
server.post("/api/student/add", (req, res) => {
  let details = {
    stname: req.body.stname,
    course: req.body.course,
    fee: req.body.fee,
    email: req.body.email, // Added email
    phone: req.body.phone, // Added phone
  };

  let sql = "INSERT INTO student SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Student creation failed" });
    } else {
      res.send({ status: true, message: "Student created successfully" });
    }
  });
});

// View the Records (including email and phone)
server.get("/api/student", (req, res) => {
  var sql = "SELECT * FROM student";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Search the Records by student ID (including email and phone)
server.get("/api/student/:id", (req, res) => {
  var studentid = req.params.id;
  var sql = "SELECT * FROM student WHERE id=" + studentid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update the student Records (email and phone added)
server.put("/api/student/update/:id", (req, res) => {
  let sql =
    "UPDATE student SET stname='" +
    req.body.stname +
    "', course='" +
    req.body.course +
    "', fee='" +
    req.body.fee +
    "', email='" +
    req.body.email + // Added email
    "', phone='" +
    req.body.phone + // Added phone
    "' WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Student Update Failed" });
    } else {
      res.send({ status: true, message: "Student Updated successfully" });
    }
  });
});

// Delete the student Records
server.delete("/api/student/delete/:id", (req, res) => {
  let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Student Deletion Failed" });
    } else {
      res.send({ status: true, message: "Student Deleted successfully" });
    }
  });
});
