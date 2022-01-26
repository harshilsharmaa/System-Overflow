var express = require('express');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var connectDB = require('./config/db');
var morgan = require('morgan');
var hbs = require('hbs');
var methodOverride = require('method-override');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo');
var moment = require('moment');


// load config
dotenv.config({path: './config/config.env'})

var PORT = process.env.PORT || 5000


// Passport config
require('./config/passport')(passport)

connectDB()

var app = express();

// Session
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())


const partials_path = path.join(__dirname, '/templates/partials');
const template_path = path.join(__dirname, '/templates/views');


app.use(express.static(path.join(__dirname, '/public')))
app.set('views', template_path)
app.set('view engine', 'hbs');
hbs.registerPartials(partials_path);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended:false}))


// Handlebar Helpers
hbs.registerHelper("truncateText", function(text) {
    var truncatedText = text.substring(0, 85)+"...";
    return truncatedText;
});

hbs.registerHelper("truncateName", function(name) {
    var truncatedName = name.substring(0, 15);
    return truncatedName;
});


hbs.registerHelper("length", function(arr){
    var len =  arr.length;
    if(len==0){
        return false;
    }
    return len;
})


hbs.registerHelper("formatDate", function(date){
    return moment(date).format('MMMM do yyyy, h:mm:ss a')
})



// @dec wrongURL , render error page
// app.get('*', function(req, res){
    // if(checkLogin(req)){
        // res.render('error', {login:true});
    // }
    // else{
        // res.render('error', {login:false});
    // }
// });



// Set global variable
app.use(function(req,res,next){
    res.locals.user = req.user || null
    next();
})


// app.get('/loader', (req,res)=>{
//     res.render('loader');
// })

//  Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/questions', require('./routes/questions'))
app.use('/user', require('./routes/user'))


app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})