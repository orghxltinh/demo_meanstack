window.global = {};
global.checkAuth = function(res,callback){
    if(res.auth != 'undefined' && res.auth == 0) alert('session is expired!');
    else if(callback && typeof(callback) == 'function') callback();    
};