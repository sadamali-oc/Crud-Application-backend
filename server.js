const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const server = express;


//Establishing connection to the database

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbschool'
});


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});





