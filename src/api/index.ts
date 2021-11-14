import axios, { AxiosPromise, CancelTokenSource } from 'axios';

axios.defaults.baseURL = 'https://api.nytimes.com/svc/search/v2';
axios.defaults.params = {
  'api-key': process.env.REACT_APP_VERCEL_ENV_API_KEY,
};

export default {
  searchArticles: (query: string, source?: CancelTokenSource): AxiosPromise => {
    return axios.get(`/articlesearch.json?q=${query}`, {
      cancelToken: source?.token,
    });
  },
};
