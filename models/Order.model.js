const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type : Schema.Types.ObjectId, ref: 'User'},
  orderDate: Date,
  items: [{
    productId : { type : Schema.Types.ObjectId, ref: 'Product'},
    quantity: Number,
  }],
  status: {type: String, enum: [ 'En attente de validation', 'Validée', 'Expédiée']},
  shippingDate:Date,
  add_delivery:{
    street: {
      type: String,
      required: true
    },
    supp: String,      
    zip:{
      type: Number,
      required: true
    },
    city:{
      type: Number,
      required: true
    }
  },
  add_billing:{
    street: {
      type: String,
      required: true
    },
    supp: String,      
    zip:{
      type: Number,
      required: true
    },
    city:{
      type: Number,
      required: true
    }
  }
}, 
{
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;