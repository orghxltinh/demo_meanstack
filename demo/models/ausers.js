var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var ausersSchema = mongoose.Schema({
    user: String,
    password: String 
});

ausersSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

ausersSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('Ausers',ausersSchema);