
import axios from 'axios';
const baseURL = 'http://3.108.93.231:8383/'

export const api = {

  homeScreenApi: data => {
    return axios.post(`${baseURL}getHomeDetails`,data,{
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },
  
  getNewLeadVillage: data => {
    return axios.post(`${baseURL}village`,data,{
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },
  
  createLead: data => {
    return axios.post(`${baseURL}lead`,data,{
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- Logout Api -----------------
  logoutApi: data => {
    return axios.get(`${baseURL}logout/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },



  activitylistingscreenApi: data => {
    return axios.post(`${baseURL}getActivity`,data,{
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },



  updateActivity: data => {
    return axios.post(`${baseURL}updateActivity`,data,{
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },


  getCGTslot: data => {
    return axios.post(`${baseURL}getCGTSlot`,data,{
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  getCustomerList: data => {
    return axios.post(`${baseURL}getCustomerForEmployee`,data,{
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },


};

