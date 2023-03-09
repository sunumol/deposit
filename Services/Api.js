import axios from 'axios';
const baseURL = 'http://3.108.93.231:8383/'

export const api = {

  // ---------------- get HomeScreen Api -----------------
  homeScreenApi: data => {
    return axios.post(`${baseURL}getHomeDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- get NewLead Village Api -----------------
  getNewLeadVillage: data => {
    return axios.post(`${baseURL}village`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- New Lead Api -----------------
  createLead: data => {
    return axios.post(`${baseURL}lead`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- Logout Api -----------------
  logoutApi: () => {
    return axios.get(`${baseURL}logout/1`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- Get Login Otp Api -----------------
  getLoginOtp: data => {
    return axios.post(`${baseURL}register`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- Resend Otp Api -----------------
  resendLoginOtp: data => {
    return axios.post(`${baseURL}resendOtp`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- confirm Login Otp Api -------------
  confirmLoginOtp: data => {
    return axios.post(`${baseURL}confirm`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

};
