var express = require('express');
// const User = require('../models/userModel.js')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/logMeIn',function(req,res,next){
	
})
router.post('/logMeOut',function(req,res,next){
	console.log(req.session)
	delete req.session.lgdIn
	res.json({'lgn':'success Out'})
})

module.exports = router;
