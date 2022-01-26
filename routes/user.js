var express = require("express");
var router = express.Router();
var bcrypt = require('bcryptjs');
var {ensureAuth, ensureLogin} = require('../middleware/auth')

const Register = require('../models/registers');


// @dec  signup user
// @route POST /signup
router.post('/signup', async(req, res)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if(password===cpassword){
            var newUser = new Register({
                name:name,
                email:email,
                password:password
            })

            const registered = await newUser.save()
            res.redirect('login')
        }
        else{
            console.log('not same');
        }
    }
    catch(err){
        console.log(err);
    }

});



// @dec  login user
// @route POST /login
router.post('/login', async(req, res)=>{

    try{
        var email = req.body.email;
        var password = req.body.password;
        // console.log(email);

        const useremail =  await Register.findOne({email:email});

        const isMatch = await bcrypt.compare(password, useremail.password);
        if(isMatch){
            sess = req.session;
            sess.userid = useremail.id
            sess.name = useremail.name;
            sess.email = useremail.email;
            sess.admin = useremail.admin;
            if(sess.admin){
                admin = true;
            }
            sess.profileimage = useremail.profileimage;
            pi = useremail.profileimage;
        
            res.status(201).redirect('/index');
        }
        else{
            res.status(400).send("INVALID LOGIN CREDENTIALS");
        }
    }
    catch(error){

        res.render('login', {error:"error"});
    }
});


// @dec logout user
// @route GET /logout
router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/');
})



// @dec delete account
// @route GET /delete/:id
router.get('/deleteaccount/:id', (req,res)=>{

    Register.deleteOne({_id:req.params.id}, function(err, user){
        if(err){
            console.log(err);
        }
    })
    res.status(201).redirect('/index');
})



// router.post('/infosave/:id', upload.single("profileimage"), (req,res)=>{

//     Register.findById({_id:req.params.id}, function(err, user){
//         if(req.body.name){
//             user.name = req.body.name;
//             // user.email = req.body.email;
//         }

//         if(err){
//             console.log(err);
//         }
//         else if(req.body.email){
//             const newemail = req.body.email;

//             Register.find({email:newemail}, function(err, result){


//                 if(err){
//                     console.log(err);
//                 }
//                 else if(!result.length){
//                     user.email = req.body.email;
//                     console.log("email is "+newemail);
//                 }
//                 else{
//                     console.log("Email Already exist");
//                 }
//             })
//         }
//         if(req.file){
//             user.profileimage = req.file.filename;
//             console.log("filename is "+req.file.filename);
//         }
//         user.save();
//     })

//     res.status(201).redirect('/index');
// })




// @dec show profile page
// @route GET /profile/:id
router.get('/profile/:id', async(req,res)=>{


    try {
        var userAuthor = false;
        if((req.user) && (req.user.id==req.params.id)){
            userAuthor = true;
        }

        const usasder = await Register.findOne({_id:req.params.id}).populate('questions').populate('answers').exec((err,user)=>{
            res.render('profile',{user,userAuthor:userAuthor});
        }); 

    } catch (err) {
        console.log(err);
    }

})

module.exports = router;
