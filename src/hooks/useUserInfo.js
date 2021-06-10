import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';
import errorHandling from '../functions/errorHandling';

export default function useUserInfo(params) {
  const fetcher = (url) =>
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((response) => response.data.data);

  const { data, error } = useSWR(`${PUBLIC_IP}/user`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
