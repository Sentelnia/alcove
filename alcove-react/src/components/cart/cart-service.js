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

  addToCart() {
    return this.service.put('/cart/add')
    .then(response => response.data)
  },

  validateCart(){
    return this.service.post('/cart/checkout')
    .then(response => response.data)
  }

}