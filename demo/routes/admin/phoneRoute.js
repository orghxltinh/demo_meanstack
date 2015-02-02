module.exports = function(express,formidable,util,fs,mkdirp){
    var router = express.Router();
    var Phones = require('./../../models/phones');
    
     router.route('/rest/:_id')
        .delete(global.ajaxIsLogging,function(req,res){
            console.log(req.params._id);
            console.log(req.body);
            Phones.findById(req.params._id).remove(function(err){
                if(err) res.json(responseData(false,err));
                else res.json(responseData(true,'delete success'));
            });
        });
        
    router.route('/rest')
        .get(global.ajaxIsLogging,function(req,res){
            Phones.find(function(err,phones){
                if(err) res.json(responseData(false,err));
                else    res.json(responseData(true,'',phones));
            });
        })
        .post(global.ajaxIsLogging,function(req,res){
            
            var form = formidable.IncomingForm();
            var phone, isSave = false;
            form.parse(req,function(err,fields,files){
                console.log('fields:',fields);
                //console.log('files:',files);
                
                phone = new Phones({
                    'name' : fields.name,
                    'price' : fields.price,
                    'quantity' : fields.quantity
                });             
            });
            
            form.on('end',function(fields,files){
                //console.log(this);
                var _this = this;
                phone.save(function(err,data){
                    
                    if(err) console.log(err);
                    else{ 
                        isSave = true;
                        console.log('save');
                        var temp_path = _this.openedFiles[0].path;
                        var file_name = _this.openedFiles[0].name;
                        var new_location = 'public/uploads/'+data._id+'/';
                        mkdirp(new_location,function(err){
                            if(err) console.log('can not create folder:', new_location);
                            else{
                                console.log('create file');
                                fs.copy(temp_path,new_location+file_name,function(err){
                                    if (err) {
                                        console.error(err);
                                    } else {
                                        data.image = file_name;
                                        data.save(function(err){
                                            if(err) console.log('can not update image name');
                                            else res.json({'success':1});
                                        });                                        
                                    }
                                });
                            }
                        });
                    }
                });
                
            });
            /*            
            var phones = new Phones({
                'name' : req.body.name,
                'price' : req.body.price,
                'image' : req.body.image,
                'quantity' : req.body.quantity
            });

            phones.save(function(err){
                console.log(req);
                if(err) res.json(responseData(false,err));
                else        res.json(responseData(true,''));       
            });
            */
        })
        .put(global.ajaxIsLogging,function(req,res){
            Phones.findById(req.body._id,function(err,data){
                if(err){
                    console.log(err);
                    res.json({'success':'not success'});
                }else{
                    data.name = req.body.name;
                    data.price = req.body.price;
                    data.image = req.body.image;
                    data.quantity = req.body.quantity;
                    process.nextTick(function(){
                        data.save(function(err){
                            if(err) res.json(responseData(false,err));
                            else res.json(responseData(true,'',data));                                 
                        });
                    });
                    
                }
            });
        })
        
    ;
    
    return router;
};

function responseData(success,message,data){
    var s;
    success ? s = 1 : s = 0;
    return {
        success: s,
        message: message,
        data: data
    };
};