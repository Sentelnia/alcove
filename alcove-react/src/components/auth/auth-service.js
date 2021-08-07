/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL || ""}/api`,
    withCredentials: true
  }),

  login(email, password) {
    return this.service.post('/sessions', { email, password })
      .then(response => {
        return response.data
      })
  },

  signup(email, password, firstName, lastName) {
    return this.service.post('/users', {
      email,
      password,
      firstName,
      lastName
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

  deleteAccount() {
    return this.service.delete('/user', {})
      .then(response => response.data)
  },

  edit(userData) {
    return this.service.put('/user', userData)
      .then(response => {
        return response.data.user
      })
  },

  verify(token){
    return this.service.get(`/verify/${token}`)
    .then(response => {
      return response.data
    })
  },

  updatePassword(currentPassword, newPassword) {
    return this.service.put('/user/update-password', {
      currentPassword: currentPassword,
      newPassword: newPassword
    })
      .then(response => {
        return response.data.user
      })
  },

  forgotPassword(email) {
    return this.service.put('/user/forgot-password', { email })
      .then(response => {
        return response.data
      })
  },

  resetPassword(token) {
    return this.service.get(`/user/reset-password/${token}`)
      .then(response => {
        return response.data
      })
  },

  updateForgottenPassword(email, newPassword) {
    return this.service.put('/user/update-forgotten-password', {
      email: email,
      newPassword: newPassword
    })
      .then(response => {
        return response.data
      })
  },
};