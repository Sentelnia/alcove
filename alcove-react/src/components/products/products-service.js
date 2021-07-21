/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true
  }),

  // createProduct(productPrice, productName, productDescription, productAdvice, productIngredients, productCategory){
  //   console.log('param fn:',productPrice, productName, productDescription, productAdvice, productIngredients, productCategory)
  //   return this.service.post('/products', {
  //     unitPrice: productPrice,
  //     name:productName,
  //     description:productDescription,
  //     advice:productAdvice,
  //     ingredients:productIngredients,
  //     category:productCategory
  //   })
  //   .then(response => response.data)
  // },

  createProduct(productData){
    console.log('productData:',productData)
    return this.service.post('/products', productData)
    .then(response => response.data)
  },

  getProducts() {
    return this.service.get('/productslist')
    .then(response => response.data)
  },

  getProduct(){
    return this.service.get('/products/:id')
    .then(response => response.data)
  },

  updateProduct(productPrice, productName, productDescription, productAdvice, productIngredients, productCategory){
    return this.service.put('/products/:id', {
      unitPrice: productPrice,
      name:productName,
      description:productDescription,
      advice:productAdvice,
      ingredients:productIngredients,
      category:productCategory
    })
    .then(response => response.data)
  },

  deleteProduct(){
    return this.service.delete('/products/:id')
    .then(response => response.data)
  }
}