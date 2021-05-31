import axios from 'axios';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';

export default function useScholarship(params) {
  const fetcher = (url) =>
    axios.post(url, params).then((response) => response.data.data);

  const { data, error } = useSWR(`${PUBLIC_IP}/scholarship`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
