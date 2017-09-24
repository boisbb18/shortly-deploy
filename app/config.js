var path = require('path');
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/27017');
var db = mongoose.connection;
module.exports = db;
db.on('error', console.error.bind(console, 'connection error'))

db.once('open', function(){
  console.log('We\'re connected!');
})


module.exports = db;