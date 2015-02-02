var express     = require('express'), 
    app         = express();
var path        = require('path');
var port        = process.env.PORT || 3000;

var flash 	 = require('connect-flash');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var expressHbs = require('express-handlebars');

//file upload
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var qt = require('quickthumb');

//directory management
var mkdirp = require('mkdirp');

// Get all config information
require('./config/global');
var config      = require('./config/config');
//connect to mongo database
var mongoose    = require('mongoose');
mongoose.connect(config.db);

var passport = require('passport');

app.use(morgan('dev'));
app.use(bodyParser());
app.use(cookieParser()); // read cookies (needed for auth)
var number = 560000;

app.use(session({
    secret:'thisisprivate,donotengage',
    cookie: { 
        //secure: true,
        expires: new Date(Date.now() + number),
        maxAge: number 
    }
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/adminAuth')(passport);

app.set('views',path.join(__dirname,'views'));

app.engine('hbs', expressHbs({
    extname:'hbs', 
    defaultLayout:'main/main.hbs',
    partialsDir: ['views/partials'],
}));


app.set('view engine', 'hbs');

//app.set('views',path.join(__dirname,'views'));
app.use(qt.static(path.join(__dirname,'public')));

app.use(function(req,res,next){    
    req.session.cookie._expires = new Date(Date.now() + number);
//    console.log('req.session.cookie._expires:',req.session.cookie._expires);
//    console.log('session:',req.session);
    console.log('middleware: ','client send request and server response');
    next();
});
 

//define all routes
var defaultRoute = require('./routes/defaultRoute')(express);
var phonesRoute = require('./routes/phonesRoute')(express);
var adminRoute = require('./routes/admin/adminRoute')(express,passport);
var adminPhoneRoute = require('./routes/admin/phoneRoute')(express,formidable,util,fs,mkdirp);

app.use('/',defaultRoute);
app.use('/_phones',phonesRoute);
app.use('/admin',adminRoute);
app.use('/admin/_phones',adminPhoneRoute);

app.listen(port);
console.log('app is running at port:',port);