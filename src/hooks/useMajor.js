import axios from 'axios';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';
export default function useMajor() {
  const { seoulFirstMajor, isLoading_sf } = useSeoulFirstMajor();
  const { seoulSecondMajor, isLoading_ss } = useSeoulSecondMajor();
  const { globalFirstMajor, isLoading_gf } = useGlobalFirstMajor();
  const { globalSecondMajor, isLoading_gs } = useGlobalSecondMajor();

  return {
    seoulFirstMajor,
    seoulSecondMajor,
    globalFirstMajor,
    globalSecondMajor,
    isLoading: isLoading_gf || isLoading_gs || isLoading_sf || isLoading_ss,
  };
}

export function useSeoulFirstMajor() {
  const fetcher = (url, type) =>
    axios.get(url, { params: type }).then((response) => response.data.data);

  const { data, error } = useSWR(
    [`${PUBLIC_IP}/major`, 'first', 1],
    (url, type, campusId) => fetcher(url, { type, campusId }),
  );
  // { params: { type: 'first', campusId: 1 } }
  return {
    seoulFirstMajor: data,
    isLoading_sf: !error && !data,
    isError: error,
  };
}
export function useSeoulSecondMajor() {
  const fetcher = (url, type) =>
    axios.get(url, { params: type }).then((response) => response.data.data);

  const { data, error } = useSWR(
    [`${PUBLIC_IP}/major`, 'second', 1],
    (url, type, campusId) => fetcher(url, { type, campusId }),
  );
  // { params: { type: 'first', campusId: 1 } }
  return {
    seoulSecondMajor: data,
    isLoading_ss: !error && !data,
    isError: error,
  };
}
export function useGlobalFirstMajor() {
  const fetcher = (url, type) =>
    axios.get(url, { params: type }).then((response) => response.data.data);

  const { data, error } = useSWR(
    [`${PUBLIC_IP}/major`, 'first', 2],
    (url, type, campusId) => fetcher(url, { type, campusId }),
  );
  return {
    globalFirstMajor: data,
    isLoading_gf: !error && !data,
    isError: error,
  };
}
export function useGlobalSecondMajor() {
  const fetcher = (url, type) =>
    axios.get(url, { params: type }).then((response) => response.data.data);

  const { data, error } = useSWR(
    [`${PUBLIC_IP}/major`, 'second', 2],
    (url, type, campusId) => fetcher(url, { type, campusId }),
  );
  return {
    globalSecondMajor: data,
    isLoading_gs: !error && !data,
    isError: error,
  };
}
