var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var UserSchema = mongoose.Schema({
  username: {type: String, index: {unique:true}},
  password: String
})

var User = mongoose.model('User', UserSchema);


User.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      console.error(err, ' < -- was the error :)')
    }
    callback(null, isMatch);
  });
}

UserSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
  });
})
module.exports = User;
