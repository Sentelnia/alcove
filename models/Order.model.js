const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  orderDate: { type: Date, default: Date.now },
  items: [{
    product: { type: Schema.Types.Object, ref: 'Product' },
    quantity: Number
  }],
  status: { type: String, enum: ['En attente de validation', 'Validée', 'Expédiée'], default: 'En attente de validation' },
  shippingDate: Date,
  deliveryMode:{type: String, enum: ['Retrait en boutique', 'Livraison à domicile'], default: 'Livraison à domicile' },
  addDelivery: {
    street: {
      type: String,
      required: true
    },
    supp: String,
    zip: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  addBilling: {
    street: {
      type: String,
      required: true
    },
    supp: String,
    zip: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  }
},
  {
    timestamps: true
  });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;