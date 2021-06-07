import axios from 'axios';
import useSWR from 'swr';
import { PUBLIC_IP } from '../config';
import moment from 'moment';

export default function useScholarship(selectedCampusTag, selectedOptionTag) {
  const fetcher = (url, selectedTags) =>
    axios.post(url, selectedTags).then((response) => {
      if (Object.keys(selectedTags).length === 0) {
        const selectedMatchedData = response.data.data.filter((e) => {
          if (e.ScholarshipDate === null) {
            return null;
          } else {
            let x = moment(e.ScholarshipDate.date);
            let today = moment();
            return x.diff(today, 'days') >= 0;
          }
        });
        return selectedMatchedData;
      }

      return response.data.data;
    });
  const getSelectedCampusTags =
    selectedCampusTag?.campusId.length !== 0 ? selectedCampusTag : null;
  const getSelectedOptionTags =
    selectedOptionTag?.optionId.length !== 0 ? selectedOptionTag : null;
  const { data, error } = useSWR(
    [`${PUBLIC_IP}/scholarship`, getSelectedCampusTags, getSelectedOptionTags],
    (url, tag1, tag2) => fetcher(url, { ...tag1, ...tag2 }),
  );

  return {
    scholarshipData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
