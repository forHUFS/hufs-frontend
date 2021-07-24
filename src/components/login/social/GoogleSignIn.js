import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
<<<<<<< HEAD

=======
>>>>>>> df388f6f0849381a9be200ab24ac5598f88cce32
import { useHistory } from 'react-router';
import axios from 'axios';
import { PUBLIC_IP } from '../../../config';
import { message } from 'antd';
import { mutate } from 'swr';

function GoogleSignIn({ setModalVisible }) {
  const history = useHistory();
  const [modalState, setModalState] = useState(true);

  return (
    <>
      <GoogleLogin
        clientId="13311386829-vlj3ciu02fu1tqriq8dqo0a3nsm4f90u.apps.googleusercontent.com"
        onSuccess={(googleData) => {
          axios
            .post(
              `${PUBLIC_IP}/user/sign-in`,
              {
                email: googleData.profileObj.email,
                provider: 'google',
              },
              { withCredentials: true },
            )

            .then((response) => {
              if (response.status === 200) {
                mutate(`${PUBLIC_IP}/user`);
                message.success('로그인이 정상 완료 되었습니다.');
                history.push('/');
                setModalState(false);
                setModalVisible(false);
              }
            })
            .catch((error) => {
              switch (error.response?.status) {
                case 404:
                  message.warning(
                    '회원가입이 되지 않은 사용자입니다. 회원가입 페이지로 넘어갑니다.',
                  );
                  history.push('/register', {
                    email: googleData.profileObj.email,
                    provider: 'google',
                  });
                  break;
                case 499:
                  console.log('body가 비어있는 상태입니다.');
                  break;
              }
            });
        }}
        onFailure={(e) => console.log(e)}
        cookiePolicy={'single_host_origin'}
<<<<<<< HEAD
      //buttonText='구글로 로그인하기'
=======
        //buttonText='구글로 로그인하기'
>>>>>>> df388f6f0849381a9be200ab24ac5598f88cce32
      >
        <span style={{ color: 'black' }}>구글로 로그인하기</span>
      </GoogleLogin>
    </>
  );
}

export default GoogleSignIn;
