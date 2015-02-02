var mongoose = require('mongoose');

var phonesSchema = mongoose.Schema({
    'name' : String,
    'price' : String,
    'image' : String,
    'quantity' : Number
    
});

module.exports = mongoose.model('Phones',phonesSchema);