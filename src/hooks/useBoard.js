import axios from 'axios';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';
export default function useBoard(boardTitle) {
  const fetcher = (url) =>
    axios.get(url).then((response) => response.data.data);

  const { data, error } = useSWR(`${PUBLIC_IP}/board/${boardTitle}`, fetcher);

  return {
    board: data,
    isLoading: !error && !data,
    isError: error,
  };
}
