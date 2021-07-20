import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true
  }),

  createProduct(){
    return this.service.post('/products', {
      unitPrice,
      name,
      description,
      advice,
      ingredients,
      category
    })
    .then(response => response.data)
  },

  getProducts() {
    return this.service.get('/products')
    .then(response => response.data)
  },

  getProduct(){
    return this.service.get('/products/:id')
    .then(response => response.data)
  },

  updateProduct(){
    return this.service.put('/products/:id',{
      unitPrice,
      name,
      description,
      advice,
      ingredients,
      category
    })
    .then(response => response.data)
  },

  deleteProduct(){
    return this.service.delete('/products/:id')
    .then(response => response.data)
  }
}