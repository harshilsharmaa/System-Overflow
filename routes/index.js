var express = require("express");
var router = express.Router();
var {ensureAuth, ensureGuest, ensureLogin} = require('../middleware/auth')


const Question = require('../models/questions');

// @dec show home page
// @route GET/ /
router.get('/', (req,res)=>{
    res.render("home")
})

var by_tag = false;
var active_ques = false;
var admin = false;
router.post('/bytag', (req,res)=>{
    by_tag = req.body.tags;
    res.redirect("/index");
})

router.get('/activequestions', (req,res)=>{
    active_ques = true;
    res.redirect("/index");
})


// @dec show index page
// @route GET /index
router.get('/index', async(req, res)=>{

    try {
        if(ensureLogin(req)){
            if(by_tag){
                var questions = await Question.find({tags:{"$in" : [`${by_tag}`]}},{})
                .sort({date:'desc'})
                .populate('user');
                res.render('index', {questions:questions ,by_tag:true, len:questions.length ,login:true,user:req.user, admin:admin})
                by_tag = false;
            }
            else if(active_ques){
                var questions = await Question.find({answers: {$exists:true, $size:0}},{})
                .sort({date:'desc'})
                .populate('user');
                res.render('index', {questions:questions,active_ques:true, len:questions.length ,login:true,user:req.user, admin:admin})
                active_ques = false;
            }
            else{
                var questions = await Question.find({},{})
                .sort({date:'desc'})
                .populate('user');
                res.render('index', {questions:questions ,login:true,user:req.user, admin:admin})
            }
        }
        else{
            if(by_tag){
                var questions =  await Question.find({tags:{"$in" : [`${by_tag}`]}},{})
                .sort({date:'desc'})
                .populate('user');
                res.render('index', {questions:questions ,by_tag:true, len:questions.length ,login:false, admin:admin})
                by_tag = false;
            }
            else if(active_ques){
                var questions = await Question.find({answers: {$exists:true, $size:0}},{})
                .sort({date:'desc'})
                .populate('user');
                res.render('index', {questions:questions,active_ques:true, len:questions.length ,login:false, admin:admin})
                active_ques = false;
            }
            else{
                var questions = await Question.find({},{})
                .sort({date:'desc'})
                .populate('user');
                res.render('index', {questions:questions ,login:false, admin:admin})
            }
        }
    } catch (err) {
        console.log(err);
    }

})


// @dec show contact page
// @route GET /contact
router.get('/contact', (req, res)=>{

    if(ensureLogin(req)){
        res.render("contact", {login:true, admin:admin});
    }
    else{
        res.render("contact", {login:false});
    }
})


// @dec show about page
// @route GET /about
router.get('/about', (req, res)=>{

    if(ensureLogin(req)){
        res.render("about", {login:true, admin:admin});
    }
    else{
        res.render("about", {login:false});
    }
})


// @dec show index page
// @route GET /index
router.get('/login', (req, res)=>{
    res.render("login");
})


// @dec show signup page
// @route GET /signup
router.get('/signup', (req, res)=>{
    res.render("signup");
})



// @dec show contact page
// @route post /contact
router.post('/contact', async(req,res)=>{
    // console.log(req.body.name);
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'harshilforwebsite@gmail.com',
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: `${email}`,
        to: 'harshilforwebsite@gmail.com',
        subject: 'From Website !!',
        text: `From: ${name}\n Email: ${email}\n Message: ${message}`
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            console.log("Not send");
        } else {
            // console.log('Email sent: ' + info.response);
            res.status(201).redirect('index');
        }

    })

})


module.exports = router;
