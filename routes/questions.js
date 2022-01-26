var express = require("express");
var router = express.Router();
var {ensureAuth, ensureLogin} = require('../middleware/auth')

const Question = require('../models/questions');
const Answer = require('../models/answers');
const Register = require('../models/registers');


// @dec to store images related to question
var path = require('path');
var multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/images')
    },
    filename: (req, file, cb)=>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})


// @dec show askquestion page
// @route GET /askquestion
router.get('/askquestion', (req,res)=>{
    if(ensureLogin(req)){
        res.render("askquestion", {login:true, admin:admin}) 
    }
    else{
        res.render("login", {login:false}) 
    }
})

// @dec show editQuestion page
// @route GET /editquestion
router.get('/editquestion/:id', async(req,res)=>{

    try {
        await Question.findById(req.params.id).exec((err,question)=>{
            res.render("editquestion", {question:question,login:true})
        })
    } catch (err) {
        console.log(err);
    }

})

// @dec process ask question
// @route POST /askquestion
router.post('/askquestion',upload.single('mainimage'), async (req,res)=>{
    var title = req.body.title;
    var description = req.body.description;

    var tagArr = []; 

    if(req.body.python){
        tagArr.push("python")
    }
    if(req.body.mongodb){
        tagArr.push("mongodb")
    }
    if(req.body.nodejs){
        tagArr.push("nodejs")
    }
    if(req.body.javascript){
        tagArr.push("javascript")
    }
    if(req.body.express){
        tagArr.push("express")
    }

    if(req.file){
        var mainimage = req.file.filename
    }
    


    var newQuestion = new Question({
        title:title,
        description:description,
        tags: tagArr,
        mainimage: mainimage,
        user: req.user.id,
    })



    newQuestion.save((err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            Register.findById(req.user.id).exec((err, user)=>{
                if(err){
                    console.log(err);
                }
                else{
                    user.questions.push(result);
                    user.save();
                    res.redirect('/index');
                }
            })
        }
    });
    
})


// @dec show single question
// @route GET /show
router.get('/show/:id', async(req,res)=>{

    try {
        var logedin = false;
        if(ensureLogin(req)){
            logedin = true;
        }

        var a = await Question.findById(req.params.id).lean().populate([{path:'user'},{path:'answers',populate:{path:'user'}}]).exec( function(err, question){
            var userAuthor = false;
            // if((req.user)&&(req.user.id==question.user.id)){
            //     userAuthor = true;
            // }

            res.render('show', {
                question: question,
                logedin: logedin,
                userAuthor:userAuthor
            })
        });
    }
    catch (err) {
        console.log(err);
    }
})


// @dec process ask question
// @route POST /askquestion
router.post('/editquestion/:id',upload.single('mainimage'), async (req,res)=>{
    var title = req.body.title;
    var description = req.body.description;

    var tagArr = []; 

    if(req.body.python){
        tagArr.push("python")
    }
    if(req.body.mongodb){
        tagArr.push("mongodb")
    }
    if(req.body.nodejs){
        tagArr.push("nodejs")
    }
    if(req.body.javascript){
        tagArr.push("javascript")
    }
    if(req.body.express){
        tagArr.push("express")
    }

    if(req.file){
        var mainimage = req.file.filename
    }
    


    var update = {
        title:title,
        description:description,
        tags: tagArr,
        mainimage: mainimage,
        user: req.user.id,
    }

    // var question = await Question.findById(req.params.id).lean()
    var question = await Question.findOneAndUpdate({_id:req.params.id},update, {new:true})


    res.render(`/show:${req.params.id}`); 
})

// @dec delete question
// @route GET 
router.get('/deleteQuestion/:id', (req,res)=>{


    console.log(req.params.id);

    Question.deleteOne({_id:req.params.id}, function(err){
        if(err){
            console.log(err);
        }
    });
    res.status(201).redirect('/index');
})


// @dec give answers
// @route POST /show/:id/answers
router.post("/show/:id/answer", (req,res)=>{

    var newAnswer = new Answer({
        answer:req.body.answer,
        user:req.user.id
    });

    newAnswer.save((err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            Question.findById(req.params.id, (err,question)=>{
                if(err){
                    console.log(err);
                }
                else{
                    question.answers.push(result);
                    question.save();
                }
            })

            Register.findById(req.user.id, (err,user)=>{
                if(err){
                    console.log(err);
                }
                else{
                    user.answers.push(result);
                    user.save();
                } 
            })

            res.redirect('/index');
        }
    });

})


module.exports = router;
