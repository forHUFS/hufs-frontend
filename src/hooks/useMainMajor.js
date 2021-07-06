import axios from 'axios';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';
export default function useMainMajor() {
  const fetcher = (url) =>
    axios.get(url).then((response) => response.data.data);

  const { data, error } = useSWR(`${PUBLIC_IP}/major/main-major`, fetcher);

  return {
    mainMajor: data,
    isLoading: !error && !data,
    isError: error,
  };
}
