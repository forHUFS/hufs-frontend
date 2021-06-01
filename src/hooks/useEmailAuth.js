import axios from 'axios';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';

export default function useEmailAuth(token) {
  const fetcher = (url) =>
    axios.get(url, {
      params: { token: token },
      withCredentials: true,
    });
  //   .then((response) => response.data);

  const { data, error } = useSWR(`${PUBLIC_IP}/user/email`, fetcher);

  return {
    emailAuth: data,
    isLoading: !error && !data,
    isError: error,
  };
}
