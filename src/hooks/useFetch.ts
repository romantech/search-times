import { useState, useEffect } from 'react';
import axios from 'axios';

interface ParamsType {
  method: 'get' | 'post';
  url?: string;
  payload?: Record<string, unknown>;
}

axios.defaults.baseURL = 'https://api.nytimes.com/svc/search/v2';
axios.defaults.params = {
  'api-key': process.env.REACT_APP_API_KEY,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetch = ({ method, url, payload }: ParamsType) => {
  const [requestUrl, setRequestUrl] = useState(url);
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<ArticleSearch | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (requestUrl !== '') {
      setLoading(true);
      axios({
        method,
        url: requestUrl,
        data: method === 'post' ? payload : null,
        cancelToken: source.token,
      })
        .then(({ data }) => {
          setFetchedData(data);
          setError(null);
        })
        .catch((err: Error) => {
          if (axios.isCancel(err)) return;
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      source.cancel();
    };
  }, [method, payload, requestUrl]);

  return [setRequestUrl, fetchedData, loading, error] as const;
};

export default useFetch;
