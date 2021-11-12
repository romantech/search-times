import axios, { AxiosPromise } from 'axios';

axios.defaults.baseURL = 'https://api.nytimes.com/svc/search/v2';
axios.defaults.params = {
  'api-key': process.env.REACT_APP_API_KEY,
};

export default {
  searchArticles: (query: string): AxiosPromise => {
    return axios.get(`/articlesearch.json?q=${query}`);
  },
};
