var localStrategy = require('passport-local').Strategy;
var Ausers = require('./../models/ausers');
module.exports = function(passport){
    
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });  

    passport.deserializeUser(function(id,done){
        Ausers.findById(id,function(err,user){
            done(err,user);
        });
    });
    
    passport.use('local-login',new localStrategy(
        {
            usernameField: 'user',
            passwordField: 'password',
            passReqToCallback: true
        },function(req,user,password,done){
            process.nextTick(function(){
                Ausers.findOne({'user':user},function(err,_user){
                    if(err) return done(err);
                    if(!_user) return done(null,false,req.flash('loginMessage','No user found'));  

                    if(!_user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                    return done(null,_user);
                });
            });            
        }
    ));
    
    passport.use('local-signup',new localStrategy({
            usernameField: 'user',
            passwordField: 'password',
            passReqToCallback: true
        },function(req,user,password,done){
            console.log('user:',user);
            console.log('password:',password);
            process.nextTick(function(){
                Ausers.findOne({'user':user},function(err,_user){
                    if(err) return done(err);
                    
                    if(_user){
                        done(null,false,req.flash('signupMessage', 'That email is already taken.'));
                    }else{

                        var newUser = new Ausers();
                        newUser.user = user;
                        newUser.password = newUser.generateHash(password);

                        newUser.save(function(err){
                            if(err) throw err;
                            console.log('newUser: ',newUser);
                            return done(null,newUser); 
                        });
                    }
                });
            });
            
        })
    );
    
};