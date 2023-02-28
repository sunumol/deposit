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
  
  logoutApi: () => {
    return axios.get(`${baseURL}logout/1`,{
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

};

