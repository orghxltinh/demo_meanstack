module.exports = function(express){
    var Phones = require('./../models/phones');
    var router = express.Router();
    
    router.route('/rest')
        .get(function(req,res){
            Phones.find(function(err,phones){
                if(err) res.send(err);
                else    res.json(phones);
            });
        })
        /*
        .post(function(req,res){
            var phones = new Phones({
                'name' : req.body.name,
                'price' : req.body.price,
                'image' : req.body.image,
                'quantity' : req.body.quantity
            });

            phones.save(function(err){
                console.log(req);
                if(err){
                    console.log(err);
                    res.json({'success':'not success'});
                }else        res.json({'success':'success'});
            });
        })
    */
    ;
        
    router.route('/rest/:phoneid')
        .get(function(req,res){
            console.log('req.params.phoneid:',req.params.phoneid);
            Phones.findById(req.params.phoneid,function(err,phone){
                if(err){
                    console.log(err);
                    res.json({'success':'not success'});
                }else res.json({'success':'success','phone':phone});
            });
        })
    ;
    
    
    return router;
    /*
    app.get('/rest',function(req,res){
        Phones.find(function(err,phones){
            if(err) res.send(err);
            else    res.json(phones);
        });
    });
    
    app.post('/rest',function(req,res){
        var phones = new Phones({
            'name' : req.body.name,
            'price' : req.body.price,
            'image' : req.body.image,
            'quantity' : req.body.quantity
        });
        
        phones.save(function(err){
            console.log(req);
            if(err){
                console.log(err);
                res.json({'success':'not success'});
            }
            else        res.json({'success':'success'});
        });
            
    });
    
    return app;
    */
};