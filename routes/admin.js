var express = require("express");
var router = express.Router();
var {ensureAuth, ensureLogin} = require('../middleware/auth')

const Registers = require('../models/registers');



router.get('/admin', (req, res)=>{
    if(checkLogin(req)){

        Register.find({},{}, function(err, users){
            res.render('admin', {users:users})
        })
    }
    else{
        res.send("Page Not Found");
    }
})


router.post('/removeuser', (req,res)=>{

    Register.deleteOne({email:req.body.email}, function(err, user){
        if(err){
            console.log(err);
        }
    })
    res.status(201).redirect('/admin');

    // res.status(201).redirect('/index');
})

router.post('/makeadmin', (req,res)=>{

    Register.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            user.admin = true;
            user.save();
        }
    })

    res.status(201).redirect('/admin');
})

router.post('/removeadmin', (req,res)=>{

    Register.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            user.admin = false;
            user.save();
        }
    })

    res.status(201).redirect('/admin');
})



module.exports = router;
