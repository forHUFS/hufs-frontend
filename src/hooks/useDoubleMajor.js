import axios from 'axios';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';

function useDoubleMajor() {
    const fetcher = (url) =>
        axios.get(url).then((response) => response.data.data);
    const { data, error } = useSWR(`${PUBLIC_IP}/major/double-major`,fetcher);

    return {
        doubleMajor: data,
        isLoading_d: !error && !data,
        isError: error,
    };
}

export default useDoubleMajor;