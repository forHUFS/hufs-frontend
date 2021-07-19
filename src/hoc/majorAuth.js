import { message, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import useUserInfo from '../hooks/useUserInfo';

export default function (SpecificComponent, match, option, adminRoute = null) {
  //specificComponent = 안에 넣을 컴포넌트
  const { user, isError, isLoading } = useUserInfo();
  const isMajorBoard = match.url.substring(1, 6) === 'major';
  const history = useHistory();
  // option  null = 아무나
  //         true = 로그인한 유저,  false = 로그인 안한 유저
  function AuthenticationCheck(props) {
    return <SpecificComponent props={props} />;
  }
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Spin style={{ paddingTop: 300 }} tip="로딩 중입니다."></Spin>
      </div>
    );
  }
  const majorAuthenticated = [
    user.DoubleMajor.name,
    user.MainMajor.name,
  ].includes(match.params.title);
  // console.log(majorAuthenticated);

  if (isMajorBoard && !majorAuthenticated) {
    message.warn('주 전공, 이중 전공이 아니면 게시글 작성이 불가합니다.');
    // return history.goBack();
  }

  return AuthenticationCheck;
}
