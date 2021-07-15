import React, { useState } from 'react';
import { message, Select, Input } from 'antd';
import useInput from '../../hooks/useInput';
import { postSearch } from '../../functions/postFunctions';
import { withRouter } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
const { Option } = Select;
const { Search } = Input;
function SearchAll(props) {
  const [keyword, setKeyword] = useInput('');
  const [Mobile, Default] = useResponsive();
  const onSearch = () => {
    if (keyword === '') {
      return message.warn('검색 키워드를 입력해주세요.');
    }
    const body = { keyword: keyword, option: 'titleAndContent' };
    postSearch(body)
      .then((response) => {
        props.history.push({
          pathname: `/search`,
          state: { detail: response.payload.reverse() },
        });
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
            break;
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
    <>
      <Mobile>
        <Search
          allowClear
          value={keyword}
          onChange={setKeyword}
          onSearch={onSearch}
          type="text"
          style={{ paddingTop: 30, paddingLeft: 40, paddingRight: 40 }}
          placeholder="검색어를 입력해주세요!"
        />
      </Mobile>

      <Default>
        <span id="Searchbar">
          <Search
            allowClear
            value={keyword}
            onChange={setKeyword}
            onSearch={onSearch}
          />
        </span>
      </Default>
    </>
  );
}

export default withRouter(SearchAll);
