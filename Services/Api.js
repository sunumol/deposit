import { axios, constants } from './BASE_URL';

export const api = {
  HomeScreen: data => {
    return axios.post(`${constants.baseURL}getHomeDetails`,data);
  },
};

