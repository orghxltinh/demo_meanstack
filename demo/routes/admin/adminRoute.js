module.exports = function(express,passport){
  
    var router = express.Router();
    router.route('/').get(global.isLogging,function(req,res){
        console.log('req.user:',req.user);
        res.render('admin/index',{
            layout: 'admin/admin_layout',
            userinfo: req.user,
            title:'Administration Pages'
        });
    });
    router = require('./userRoute')(router,passport);
    
    return router;
    
};