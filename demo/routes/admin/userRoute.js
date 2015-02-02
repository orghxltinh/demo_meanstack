module.exports = function(router,passport){
    //console.log(passport);
    router.route('/user')
        .get(function(req,res){
            res.render('admin/user',{
                layout: 'admin/user_layout'
            });
        })
    ;    
    
    router.route('/user/rest')
        /*.post(function(req,res){
            res.json({sucess:'sucess'});
        })*/
        .post(passport.authenticate('local-signup',{
//            successRedirect: '/admin',
//            failureRedirect : '/',
//            failureFlash : true // allow flash messages
        }),function(req,res){
            
            if(req.user){
                res.json({success:'success'});
            }else res.json({success:'fail'});
        })
    ;  
    
    router.route('/user/rest/login')
        .post(passport.authenticate('local-login',{
//            successRedirect: '/admin',
//            failureRedirect : '/',
            failureFlash : true // allow flash messages
        }),
        function(req,res){
            console.log('req.user:',req.user);
            if(req.user){
                res.json({success:'success'});
            }else res.json({success:'fail'});
        })
    ;
    
    return router;
};