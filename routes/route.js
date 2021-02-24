require('dotenv').config();
const router = require('express').Router();
const User=require('../models/user');
const Content=require('../models/content');
const nodemailer=require('nodemailer');
const {check,validationresult}=require('express-validator');


router.get('/',function(req,res){

	res.render("index",{list:Content.dept_list});

})

router.get('/:dept',function(req,res){
	
   switch(req.params.dept){

    case 'mech':res.render("dept",{event:Content.mech_events_id,name:Content.mech_events});
                break;
    case 'cse':res.render("dept",{event:Content.cse_events_id,name:Content.cse_events});
               break;
    case 'it':res.render("dept",{event:Content.it_events_id,name:Content.it_events});
              break;
    case 'ece':res.render("dept",{event:Content.ece_events_id,name:Content.ece_events});
               break;
    case 'eee':res.render("dept",{event:Content.eee_events_id,name:Content.eee_events});
               break;
    case 'civil':res.render("dept",{event:Content.civil_events_id,name:Content.civil_events});
                break;
    case 'bme':res.render("dept",{event:Content.bme_events_id,name:Content.bme_events});
               break;
    case 'che':res.render("dept",{event:Content.che_events_id,name:Content.che_events});
               break;
   }
	
})

router.get('/:dept/:event_id',function(req,res){
    
    const url="/"+req.params.dept+"/"+req.params.event_id+"/register";
    res.render("reg",{url:url});

})
router.get('/:dept/:event_id/register',function(req,res){
	
    const url="/"+req.params.dept+"/"+req.params.event_id+"/register";
	res.render("register",{url:url});

})
router.post('/:dept/:event_id/register',function(req,res){
    
    User.find({email:req.body.email},function(err,founditems){
    	if(founditems.length > 3)
    		res.json("you have already registered for 4 events");

    	const user=new User({
    	name:req.body.name,
    	email:req.body.email_id,
    	event_id:req.params.event_id,
    	mobile:req.body.mobile_no
        })
    
    user.save(function(err,next){
    	if(err)
    		console.log(err);
    	else
    		res.json(user);
    })

    })

    let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })
    let mailoptions={
        from:process.env.EMAIL,
        to:req.body.email_id,
        subject:'event registration',
        text:Content.mail_content
    }

    transporter.sendMail(mailoptions,function(err,data){
        if(err)
            console.log(err);
        else
            console.log("email sent successfully!!");
    })
    
    })


module.exports=router;