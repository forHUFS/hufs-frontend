import React, { useState } from 'react';
import { message, Select, Input } from 'antd';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import { postSearch } from '../../_actions/post_action';
import { withRouter } from 'react-router-dom';
const { Option } = Select;
const { Search } = Input;
function SearchAll(props) {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useInput('');

  const onSearch = () => {
    if (keyword === '') {
      return message.warn('검색 키워드를 입력해주세요.');
    }
    const body = { keyword: keyword, option: 'titleAndContent' };
    dispatch(postSearch(body))
      .then((response) => {
        if (response.status === 200) {
          props.history.push({
            pathname: `/search`,
            state: { detail: response.payload.reverse() },
          });
        }
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 401:
            message.error('로그인하지 않은 사용자');
            // history.push('/');
            break;
          case 403:
            message.error('접근 권한 오류');
            // history.push('/');
            break;
          case 404:
            message.info('검색 결과가 존재하지 않습니다.');
          case 422:
            if (error.response.data.message === 'QUERY_KEYWORD') {
              message.error('두 글자 이상 입력해주세요');
            } else {
              message.error('query error');
            }
          default:
            break;
        }
      });
  };
  return (
    <span id="Searchbar">
      <Search
        allowClear
        value={keyword}
        onChange={setKeyword}
        onSearch={onSearch}
      />
    </span>
  );
}

export default withRouter(SearchAll);
