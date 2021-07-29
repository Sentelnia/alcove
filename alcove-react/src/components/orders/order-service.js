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
      return response.data})
  },

  getOrder(id){
    return this.service.get(`/orders/${id}`)
    .then(response => {
      return response.data})
  },
  
  updateOrder(orderStatus,id){
    console.log('orderStatus',orderStatus)
    return this.service.put(`/orders/${id}`,{status:orderStatus})
    .then(response => {
      console.log('response updateOrder',response)
      return response.data})
  },
};