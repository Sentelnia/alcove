const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "L'email est obligatoire."],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire.'],
  },
  userNumber: String,
  civility: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  street: {
    type: String,
  },
  supp: {
    type: String
  },
  zip: {
    type: String,
  },
  city: {
    type: String
  },
  telephone: {
    type: String,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  }
},
  {
    timestamps: true
  });

const User = mongoose.model('User', userSchema);

module.exports = User;