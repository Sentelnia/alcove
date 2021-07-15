
const mongoose = require('mongoose');
const {Schema} = mongoose;


const productSchema = new Schema({
  unit_price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  advice: {
    type: String,
    required: true  
  },
  ingredients: {
    type: String,
    required: true 
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;