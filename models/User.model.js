const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire."],
    unique: true,
    lowercase: true
  },
  telephone: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire.'],
    // minlength: 6,
    // maxlength: 16,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  civility:{
    type: String,
  },
  street: {
      type: String,
  },
  supp: {
      type: String
  },
  zip:{
    type: Number,
  },
  city:{
    type: Number
  }

}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;