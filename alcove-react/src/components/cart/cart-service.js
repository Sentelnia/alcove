/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL || ""}/api`,
    withCredentials: true
  }),
  getCart() {
    return this.service.get('/cart')
      .then(response => response.data)
  },

  addToCart(id, qty) {
    const body = {
      productId: id,
      quantity: qty
    }
    return this.service.put('/cart/add', body) // Par défaut 1 élément ajouter depuis la page d'accueil
      .then(response => response.data)
  },

  updateQtyAlreadyInCart(id, qty) {
    const body = {
      productId: id,
      quantity: qty
    }
    return this.service.put('/cart/updateQty', body)
    .then(response => response.data)
  },

  validateCart(addDelivery, addBilling, deliveryMode, deliveryCost, orderNumber) {
    return this.service.post('/cart/checkout', {
      addDelivery: {
        // civility: addDelivery.deliveryCivility,
        firstName: addDelivery.deliveryFirstName,
        lastName: addDelivery.deliveryLastName,
        street: addDelivery.deliveryStreet,
        supp: addDelivery.deliverySupp,
        zip: addDelivery.deliveryZip,
        city: addDelivery.deliveryCity,
        telephone: addDelivery.deliveryTelephone,
        email: addDelivery.deliveryEmail

      },
      addBilling: {
        // civility: addBilling.billingCivility,
        firstName: addBilling.billingFirstName,
        lastName: addBilling.billingLastName,
        street: addBilling.billingStreet,
        supp: addBilling.billingSupp,
        zip: addBilling.billingZip,
        city: addBilling.billingCity,
      },
      deliveryMode: deliveryMode,
      deliveryCost: deliveryCost,
      orderNumber: orderNumber,
    })
      .then(response => response.data)
  },

  removeProduct(id) {
    const body = {
      productId: id,
    }
    return this.service.put(`/cart/remove`, body)
      .then(response => response.data)
  },

}