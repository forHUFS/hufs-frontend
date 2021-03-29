import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/user_action';
import { message, Button } from 'antd';
function Logout() {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutUser())
      .then((response) => message.success('로그아웃 성공!'))
      .catch((error) => {
        if (error.response) {
          if (error.response?.status === 401) {
            message.error('로그인하지 않은 사용자입니다.');
          }
        } else if (error.request) {
          // 요청은 o 응답은 x
          message.error(error.request);
        } else {
          message.error(error?.message);
        }
      });
  };
  return (
    <Button type="text" onClick={onLogout}>
      로그아웃
    </Button>
  );
}

export default Logout;
