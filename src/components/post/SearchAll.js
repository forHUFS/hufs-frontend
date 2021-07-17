import React, { useState } from 'react';
import { message, Select, Input } from 'antd';
import useInput from '../../hooks/useInput';
import { postSearch } from '../../functions/postFunctions';
import { useHistory, withRouter } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import useErrorHandling from '../../hooks/useErrorHandling';
const { Option } = Select;
const { Search } = Input;
function SearchAll(props) {

  const history = useHistory();
  const errorHandling = useErrorHandling();

  const { Mobile, Default } = useResponsive();
  const onSearch = (keyword) => {
    if (keyword === '') {
      return message.warn('검색 키워드를 입력해주세요.');
    }
    const body = { keyword: keyword, option: 'titleAndContent' };
    postSearch(body)
      .then((res) => {
        history.push(`/search`, { detail: res });
      })
      .catch((error) => {
        errorHandling(error.response?.data.message);
      });
  };
  return (
    <>
      <Mobile>
        <Search
          allowClear
          onSearch={(e) => onSearch(e)}
          type="text"
          style={{ paddingTop: 30, paddingLeft: 40, paddingRight: 40 }}
          placeholder="검색어를 입력해주세요!"
        />
      </Mobile>

      <Default>
        <span id="Searchbar">
          <Search
            allowClear
            onSearch={(e) => {
              onSearch(e);
            }}
          />
        </span>
      </Default>
    </>
  );
}

export default withRouter(SearchAll);
