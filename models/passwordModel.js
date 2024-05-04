const mongoose = require('mongoose');

const PasswordSchema = mongoose.Schema({
  password: {
    type: String,
    required: true
  }
});


const Password = mongoose.model('Password', PasswordSchema);

module.exports = Password;