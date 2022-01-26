var express = require("express");
var passport = require('passport')
var router = express.Router();

// @Description : Auth with Google
//  @route : GET/auth/google

router.get('/google', passport.authenticate('google', {scope: ['profile'] }))


// @Description : Google auth callback
//  @route : GET/auth/google/callback

router.get('/google/callback',  passport.authenticate('google', {failureRedirect: '/login'}), (req,res)=>{
    res.redirect('/index');
})


// @Description : logout user
//  @route : GET/auth/logout

router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/');
})


module.exports = router



module.exports = router;
