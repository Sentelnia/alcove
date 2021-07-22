/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true
  }),

  createProduct(productData){
    return this.service.post('/products', productData)
    .then(response => response.data)
  },

  getProducts() {
    return this.service.get('/productslist')
    .then(response => response.data)
  },

  getProduct(id){
    return this.service.get(`/products/${id}`)
    .then(response => response.data)
  },

  updateProduct(productData,id){
    console.log('productData:',productData)
    return this.service.put(`/products/${id}`, productData)
    .then(response => response.data)
  },

  deleteProduct(id){
    return this.service.delete(`/products/${id}`)
    .then(response => response.data)
  },

  upload(formdata) {
    return this.service.post('/upload', formdata)
      .then(response => response.data)
  }
}