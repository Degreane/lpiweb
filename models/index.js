const mongoose = require('mongoose')
const db=mongoose.connect('mongodb://localhost:27017/AdySys',{ useNewUrlParser: true })
const Schema = mongoose.Schema
const UserModel = new Schema({
	'name':{ type: String},
	'username': { type: String },
	'password': { type: String},
	'userType': { type: String},
	'email': { type: String}
})
let UserModelInstance=mongoose.model('users',UserModel)
UserModelInstance.find({userType:'admin'},function(err,users){
	if(err){
		console.log(err)
	}else{
		if(users.length == 0){
			let theUser=new UserModelInstance({
				'name':'Faysal Al-Banna',
				'username': 'Admin',
				'password': 'NimdaPass',
				'userType': 'admin',
				'email': 'degreane@gmail.com'
			})
			theUser.save()

		}
	}
})
module.exports = {
	db:db,
	collection:{
		user:mongoose.model('users',UserModel)
	}
}
return module.exports