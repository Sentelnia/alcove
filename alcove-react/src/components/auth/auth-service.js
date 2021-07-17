/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL}`,
    withCredentials: true
  }),

  login(email, password) {
    return this.service.post('/sessions', {email, password})
    .then(response => response.data)
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
    .then(response => response.data)
  },

  logout() {
    return this.service.delete('/session', {})
    .then(response => response.data)
  },

  edit(firstName, lastName, email, civility, telephone, adresses) {
    return this.service.post('/user', {
      firstName,
      lastName,
      email,
      civility,
      telephone,
      adresses
    })
    .then(response => response.data)
  },

  
};