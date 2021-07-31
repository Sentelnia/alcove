/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL || ""} /api`,
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
    return this.service.put(`/orders/${id}`,{status:orderStatus})
    .then(response => {
      return response.data})
  },

  sendEmailConfirmation(emailReceiver, orderNumber){
    return this.service.post('/email-confirmation',{
      emailSender: 'lalcove@hotmail.fr',
      emailReceiver:emailReceiver,
      subject:`Votre commande n°${orderNumber}`,
      content: 'Merci pour votre commande'
    })
    .then()
    .catch(err => console.log('err:', err))
  }
};