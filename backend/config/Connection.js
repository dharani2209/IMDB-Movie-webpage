'use strict';
import mysql2 from 'mysql2';

const dbConn = mysql2.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'password',
 database : 'moviedb'
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

export default dbConn;