global.isLogging = function(req,res,next){
    if(req.isAuthenticated()) return next();
    else res.redirect('/admin/user#/login');
};

global.ajaxIsLogging = function(req,res,next){
    if(req.isAuthenticated()) return next();
    else res.json({auth:0});
};