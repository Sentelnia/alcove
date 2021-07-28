/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true
  }),

  getOrders() {
    return this.service.get('/orders')
    .then(response => {
      // console.log('liste des commandes',response.data)
      return response.data})
  },

  getOrder(id){
    return this.service.get(`/orders/${id}`)
    .then(response => {
      console.log('detail commande',response)
      return response.data})
  },
  
  updateOrder(orderData,id){
    return this.service.put(`/orders/${id}`,orderData)
    .then(response => {
      console.log('edit status commande',response)
      return response.data})
  },
};