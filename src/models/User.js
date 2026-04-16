const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);