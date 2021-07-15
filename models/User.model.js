
const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Le prénom est obligatoire.']
  },
  lastName: {
    type: String,
    required: [true, 'Le nom de famille est obligatoire.']
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire."],
    unique: true,
    lowercase: true
  },
  tel: {
    type: Number,
    unique: true,  
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire.'],
    minlength: 6,
    // maxlength: 16,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  civility:{
    type: String,
    required: true
  },
  adresses:[{
    street: {
      type: String,
      required: true
    },
    supp: {
      type: String,
      required: true
    },
    zip:{
      type: Number,
      required: true
    },
    city:{
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;