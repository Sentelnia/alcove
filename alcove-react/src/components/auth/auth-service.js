/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true
  }),

  login(email, password) {
    return this.service.post('/sessions', { email, password })
      .then(response => {
        return response.data
      })
  },

  signup(email, password) {
    return this.service.post('/users', {
      email,
      password
    })
      .then(response => response.data)
  },

  loggedin() {
    return this.service.get('/session')
      .then(response => {
        return response.data.user
      })
  },

  logout() {
    return this.service.delete('/session', {})
      .then(response => response.data)
  },

  edit(userData) {
    console.log('userData:', userData)
    return this.service.put('/user', userData)
      .then(response => {
        return response.data.user
      })
  },
};