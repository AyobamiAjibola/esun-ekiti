import { useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';
import useAxiosPrivate from './useAxiosPrivate';

export const useAxios = (axiosParams: any) => {
  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const fetchData = async (params: AxiosRequestConfig<any>) => {
    try {
      const result = await axiosPrivate.request(params);

      if (result.statusText !== "OK") {
        setError("Could not fetch the data")
      }
      setResponse(result.data);
    } catch (err: any) {
      err && setError("Server error, Please try again"); //eslint-disable-line
    } finally {
      setLoading(false); //eslint-disable-line
    }
  };

  useEffect(() => {
    fetchData(axiosParams); //eslint-disable-line
    setUpdate(false);
  }, [update]);

  return { response, error, loading, setUpdate, update };
};
