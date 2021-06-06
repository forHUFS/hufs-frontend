import axios from 'axios';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';
export default function useScholarshipTags() {
  const { optionTags } = useOptionTags();
  const { campusTags } = useCampusTags();

  return {
    optionTags: optionTags,
    campusTags: campusTags,
  };
}

export function useOptionTags() {
  const fetcher = (url) =>
    axios.get(url).then((response) => response.data.data);

  const { data } = useSWR(`${PUBLIC_IP}/scholarship/option`, fetcher);

  return {
    optionTags: data,
  };
}

export function useCampusTags() {
  const fetcher = (url) =>
    axios.get(url).then((response) => response.data.data);

  const { data } = useSWR(`${PUBLIC_IP}/scholarship/campus`, fetcher);

  return {
    campusTags: data,
  };
}
