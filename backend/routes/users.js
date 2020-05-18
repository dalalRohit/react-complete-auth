var express = require('express');
var router = express.Router();

//GET /
router.get('/', function(req, res, next) {
  res.json({
    "name":"Rohit Dalal",
    "desc":"This project comprises all of the user-auth work"
  })
});


//POST /login
router.post('/login',(req,res,next) => {
  let data=req.body;

  res.json({
    name:"Login route..",
    data
  })
})

//POST /signup
router.post('/signup',(req,res,next) => {
  let data=req.body;

  res.json({
    name:"Signup route..",
    data
  })
})
module.exports = router;
