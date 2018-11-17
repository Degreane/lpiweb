var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/logMeIn',function(req,res,next){
	console.log(req.body)
	// request.collection.users.find({'username'})
	req.collection.users.find({'username':req.body.u,'password':req.body.p},function(err,result){
		if(err){
			return next(new Error(err))
		}else{
			if (result.length == 0){
				res.json({'lgn':'Error','msg':'Wrong <strong>UserName/PassWord</strong><br>Try Again .'})
			}else {
				req.session.lgdIn=true
				req.session.theUser=result[0]
				console.log(req.session)
				res.json({'lgn':'Success','user':result[0]})
			}
		}
	})
})
router.post('/logMeOut',function(req,res,next){
	console.log(req.session)
	delete req.session.lgdIn
	res.json({'lgn':'success Out'})
})

module.exports = router;
