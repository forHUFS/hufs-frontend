import axios from 'axios';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';

export default function useScrap() {
  const fetcher = (url) =>
    axios
      .get(url, {
        params: { directoryId: 1 },
      })
      .then((response) => response.data.data);

  const { data, error } = useSWR(`${PUBLIC_IP}/user/scrap`, fetcher);

  return {
    scrapData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
