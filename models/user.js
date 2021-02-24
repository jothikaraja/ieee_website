var mongoose=require('mongoose');


var UserSchema=new mongoose.Schema({
	name:{type:String},
	email:{type:String,lowercase:true},
	event_id:{type:String},
	mobile:{type:String}
});

module.exports =  mongoose.model('User', UserSchema);