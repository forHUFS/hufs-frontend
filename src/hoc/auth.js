import { message } from 'antd';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

export default function (SpecificComponent, option, adminRoute = null) {
  //specificComponent = 안에 넣을 컴포넌트

  // option  null = 아무나
  //         true = 로그인한 유저,  false = 로그인 안한 유저

  function AuthenticationCheck(props) {
    return <SpecificComponent props={props} />;
  }

  return AuthenticationCheck;
}
