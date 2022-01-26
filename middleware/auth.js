module.exports = {
    ensureAuth: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect('/')
        }
    },
    ensureGuest: function(req,res,next){
        if(req.isAuthenticated()){
            res.redirect('/dashbord');
        }
        else{
            return next();
        }
    },
    ensureLogin: function(req){
        if(req.isAuthenticated()){
            return true;
        }
        else{
            return false;
        }
    }  
}