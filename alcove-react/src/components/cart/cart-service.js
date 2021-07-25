/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true
  }),
  getCart() {
    return this.service.get('/cart')
    .then(response => response.data)
  },

  addToCart(id) {
    const body = {
      productId:id,
      quantity:1
    }
    return this.service.put('/cart/add',body) // Par défaut 1 élément ajouter depuis la page d'accueil
    .then(response => response.data)
  },

  validateCart(){
    return this.service.post('/cart/checkout')
    .then(response => response.data)
  },

  removeProduct(id) {
    const body = {
      productId:id,
    }
    return this.service.put(`/cart/remove`,body)
    .then(response => response.data)
  },

}