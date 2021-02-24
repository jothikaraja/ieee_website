var express=require('express');
var mongoose=require('mongoose');
var secret=require('./config/secret');
var bodyParser=require('body-parser');


var app=express();


mongoose.connect(secret.database,function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log("connected to database");
	}
});
app.set("view engine","ejs");
app.use('/:dept/:event_id/register',express.static('static'));
app.use(bodyParser.urlencoded({extended:true}));
var Route=require('./routes/route');

app.use(Route);


app.listen(secret.port,function(){
	console.log("server is running");
})