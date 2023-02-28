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
};

