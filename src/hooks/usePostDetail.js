import axios from 'axios';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';

export default function usePostDetail(postId) {
  const fetcher = (url) =>
    axios.get(url).then((response) => response.data.data);

  const { data, error } = useSWR(`${PUBLIC_IP}/post/${postId}`, fetcher);

  return {
    postDetail: data,
    isLoading: !isError && !data,
    isError: error,
  };
}
