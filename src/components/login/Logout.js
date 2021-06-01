import React from 'react';
import { message, Button } from 'antd';
import { useHistory } from 'react-router';
import { PUBLIC_IP } from '../../config';
function Logout({ setLogin }) {
  const history = useHistory();
  const onLogout = async () => {
    await axios
      .post(`${PUBLIC_IP}/user/sign-out`, null, {
        withCredentials: true,
      })
      .then(() => {
        message.success('로그아웃 성공!');
        setLogin(false);
        history.push('/');
      })
      .catch((error) => {
        if (error.response) {
          if (error.response?.status === 401) {
            message.error('로그인하지 않은 사용자입니다.');
          }
        } else if (error.request) {
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
