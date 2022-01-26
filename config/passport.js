var dotenv = require('dotenv');
// load config
dotenv.config({path: './config/config.env'})

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var mongoose =  require('mongoose')
var passport = require('passport');

var User = require("../models/registers");

module.exports = async function(passport){
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback'
            },
            async(accessToken, refreshToken, profile, done)=> {
                const newuser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value
                }

                try{
                    
                    let user = await User.findOne({googleId:profile.id})
                    if(user){
                        done(null, user)
                    }
                    else{
                        user = await User.create(newuser);
                        done(null, user) ;
                    }
                
                }
                catch(err){
                    console.log(err);
                }
            }
        )
    )

    passport.serializeUser((user, done)=> {
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> done(err, user))
    });
}