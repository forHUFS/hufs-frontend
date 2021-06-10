import axios from 'axios';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';
import errorHandling from '../functions/errorHandling';
export default function useBoard(boardId) {
  const fetcher = (url) =>
    axios.get(url).then((response) => response.data.data);

  const { data, error } = useSWR(`${PUBLIC_IP}/board${boardId}`, fetcher);

  return {
    board: data,
    isLoading: !error && !data,
    isError: error,
  };
}
