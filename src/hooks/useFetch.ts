import { useEffect, useState } from 'react';
import axios from 'axios';

interface ParamsType {
  method: 'get' | 'post' | 'patch';
  path: string;
  query?: string;
  page?: number;
  payload?: Record<string, unknown>;
}

interface ErrorType {
  status: number;
  statusText: string;
}

axios.defaults.baseURL = 'https://api.nytimes.com/svc';
axios.defaults.params = {
  'api-key': process.env.REACT_APP_API_KEY,
};

const useFetch = <T>({
  method,
  path,
  query,
  page,
  payload,
}: ParamsType): [typeof fetchedData, boolean, typeof error] => {
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<T | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    // Axios 취소 토큰 생성

    if (query !== '') {
      setLoading(true);
      axios({
        method,
        url: path,
        params: {
          q: query,
          page,
        },
        data: method === 'post' ? payload : null,
        cancelToken: source.token, // 취소 토큰 할당
      })
        .then(({ data }) => {
          setFetchedData(data);
          setError(null);
        })
        .catch((err) => {
          if (axios.isCancel(err)) return; // 취소 토큰 실행 후 요청이 취소되어 발생한 에러라면, 에러 메시지 미출력
          const statusText = err.response?.statusText || '404 Not Found';
          setError({
            status: err.response.status,
            statusText,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      // 클린업 함수는 언마운트전 혹은 업데이트전(다음 Effect 실행 전)에 실행되고,
      // 뒷정리 함수 안에 있는 값은 업데이트되기 이전의 값을 참조하므로,
      // 클린업 함수에 있는 source 취소 토큰은 이전 Axios 요청에 대한 토큰임.
      // effect(1) -> 업데이트 -> cleanup(effect1) -> effect(2)
      // 따라서 A 요청후 바로 B를 요청하면 A 요청이 취소됨
      source.cancel();
    };
  }, [method, page, path, payload, query]);

  return [fetchedData, loading, error]; /* as const */
};

export default useFetch;
