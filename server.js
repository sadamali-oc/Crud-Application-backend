const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());


//Establishing connection to the database

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
    console.log("successfully Connected to DB");
  }
});

//Establish the Port

server.listen(3000, function check(error) {
  if (error) {
    console.log("Error....dddd!!!!");
  } else {
    console.log("Server Started on Port 3000");
  }
});
