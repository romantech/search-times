import { useState, useEffect } from 'react';
import axios from 'axios';

interface ParamsType {
  method: 'get' | 'post';
  path: string;
  query: string;
  payload?: Record<string, unknown>;
}

axios.defaults.baseURL = 'https://api.nytimes.com/svc/search/v2';
axios.defaults.params = {
  'api-key': process.env.REACT_APP_API_KEY,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetch = ({ method, path, query, payload }: ParamsType) => {
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<ArticleSearch | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (query !== '') {
      setLoading(true);
      axios({
        method,
        url: `${path}?q=${query}`,
        data: method === 'post' ? payload : null,
        cancelToken: source.token,
      })
        .then(({ data }) => {
          setFetchedData(data);
          setError(null);
        })
        .catch((err: Error) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      source.cancel();
    };
  }, [method, path, payload, query]);

  return [fetchedData, loading, error] as const;
};

export default useFetch;
