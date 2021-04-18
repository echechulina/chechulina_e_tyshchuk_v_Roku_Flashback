
const express = require('express');
//express router handles incoming requests and directs them where they need to go 
//like a traffic cop
const router = express.Router();

// import the sql connection 
const connect = require("../config/sqlConfig");


router.get("/", (req, res) => {
    // res.json = echo json_encode(...) in PHP
    res.json({message: "you hit the api route"});
});

router.get("/users", (req, res) => {
    // run a SQL query here
    // res.json(query result is here)

    res.json({message: "all users route"});
})

router.get("/movies", (req, res) => {
    connect.getConnection(function (err,connection) {
        if (err) throw err; // not connected!
 
  // Use the connection
  connection.query('SELECT * FROM tbl_movies', function (error, results) {
    // When done with the connection, release it.
    connection.release();
 
    // Handle error after the release.
    if (error) throw error;
    res.json(results);
    
  });
});   
})

router.get("/tv", (req, res) => {
  connect.getConnection(function (err,connection) {
      if (err) throw err; // not connected!

// Use the connection
connection.query('SELECT * FROM tbl_tv', function (error, results) {
  // When done with the connection, release it.
  connection.release();

  // Handle error after the release.
  if (error) throw error;
  res.json(results);
  
});
});   
})

router.get("/music", (req, res) => {
  connect.getConnection(function (err,connection) {
      if (err) throw err; // not connected!

// Use the connection
connection.query('SELECT * FROM tbl_music', function (error, results) {
  // When done with the connection, release it.
  connection.release();

  // Handle error after the release.
  if (error) throw error;
  res.json(results);
  
});
});   
})

//dynamic route handler that can accept a parametr
// this is equivalent to $_GET["id"] => (req.params.id)
// you're passing the id via the roiute: /api/movies/1, /api/movies/20

router.get("/movies/:id", (req, res) => {
  // run a SQL query here -> get all movies from my DB
 connect.query(`SELECT * FROM tbl_movies WHERE movies_id=${req.params.id}`, function (error, results, fields) {
    if (error) throw error;
    console.log("results:", results, "fields:", fields);

    res.json(results);
  });

  
})

router.get("/tv/:id", (req, res) => {
  // run a SQL query here -> get all movies from my DB
 connect.query(`SELECT * FROM tbl_tv WHERE tv_id=${req.params.id}`, function (error, results, fields) {
    if (error) throw error;
    console.log("results:", results, "fields:", fields);

    res.json(results);
  });

  
})

router.get("/music/:id", (req, res) => {
  // run a SQL query here -> get all movies from my DB
 connect.query(`SELECT * FROM tbl_music WHERE music_id=${req.params.id}`, function (error, results, fields) {
    if (error) throw error;
    console.log("results:", results, "fields:", fields);

    res.json(results);
  });

  
})



module.exports = router;