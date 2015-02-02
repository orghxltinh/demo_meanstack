module.exports = function(express){
    var app = express();
    var config = require('./../config/config'),
        title = config.globalTitle;
        
    app.get('/',function(req,res){
        res.render('index',{
            title: title
        });
    });
    return app;
}; 