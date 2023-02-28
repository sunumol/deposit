import axios1 from 'axios';

export const constants = {
  baseURL: 'http://3.108.93.231:8383/',
};

export const axios = axios1.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axios.interceptors.request.use(async function (_config) {
//   var accessToken = await AsyncStorage.getItem('userAccessToken');
//   if (accessToken !== null) {
//     _config.headers.Authorization = 'Bearer ' + accessToken;
//   }
//   return _config;
// });

axios.defaults.timeout = 30000;